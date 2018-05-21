package net.devtales.blog.jsengine;

import net.devtales.blog.config.transformer.ResourceUrlsMapResolver;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.StringReader;
import java.util.stream.Collectors;

import static net.devtales.blog.util.StringReplaceAll.replaceAll;

@Component
public class JsBundleResolver {
    private final ResourceUrlsMapResolver urlsMapResolver;

    JsBundleResolver(ResourceUrlsMapResolver urlsMapResolver) {
        this.urlsMapResolver = urlsMapResolver;
    }

    public Reader resolveFile(String path) {
        InputStream in = getClass().getClassLoader().getResourceAsStream(path);
        String result = new BufferedReader(new InputStreamReader(in))
                .lines().collect(Collectors.joining("\n"));
        result = replaceAll(result, urlsMapResolver.getRelativeToVersionedUrls());
        return new StringReader(result);
    }
}
