package net.devtales.blog.jsengine;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import jdk.nashorn.api.scripting.JSObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
@Slf4j
public class CachedReact {
    private final LoadingCache<Pair<String, String>, JSObject> cache;

    CachedReact() {
        React react = new React();

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
        return cache.getUnchecked(combineKeys(url,preState));
    }

}
