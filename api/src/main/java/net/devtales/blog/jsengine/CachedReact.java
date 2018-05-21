package net.devtales.blog.jsengine;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import jdk.nashorn.api.scripting.JSObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

@Component
@Slf4j
public class CachedReact {
    private final LoadingCache<Pair<String, String>, JSObject> cache;
    private final ExecutorService executorService;
    private final React react;

    CachedReact(React react, ExecutorService executorService) {
        this.react = react;
        this.executorService = executorService;
        CacheLoader<Pair<String, String>, JSObject> loader = new CacheLoader<Pair<String, String>, JSObject>() {
            @Override
            public JSObject load(Pair<String, String> key) {
                return react.render(key.getFirst(), key.getSecond());
            }
        };

        cache = CacheBuilder.newBuilder()
                .expireAfterAccess(5, TimeUnit.MINUTES)
                .build(loader);
    }

    private Pair<String, String> combineKeys(String url, String preState) {
        return Pair.of(url, preState);
    }

    public JSObject render(String url, String preState) {
        executorService.submit(() -> {
            react.render(url, preState);
        }); //Call to keep nashorn warm

        Future<JSObject> timeoutFuture = executorService.submit(() -> cache.getUnchecked(combineKeys(url,preState)));

        JSObject result;
        try {
            log.info("Attempting to fetch react server render.");
            result = timeoutFuture.get(200, TimeUnit.MILLISECONDS);
        } catch (TimeoutException e) {
            log.info("React get cached timed out after 200 ms");
            result = null;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }

        log.info(result != null ? "Cached react success." : "Cached react failed.");
        return result;
    }

}
