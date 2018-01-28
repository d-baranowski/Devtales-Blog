package net.devtales.blog.config.transformer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.resource.ResourceUrlProvider;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static net.devtales.blog.util.StaticResourcePathsUtils.getStaticResourcePaths;

@Component
@Slf4j
public class ResourceUrlsMapResolver {
    private final ResourceUrlProvider resourceUrlProvider;

    ResourceUrlsMapResolver(ResourceUrlProvider resourceUrlProvider) {
        this.resourceUrlProvider = resourceUrlProvider;
    }

    public Map<String, String> getRelativeToVersionedUrls() {
        log.info("Attempting to getRelativeToVersionedUrls");
        log.info("Retrieved staticFilesDirectory procceding to walk it in search of files.");
        List<String> listOfStaticFiles = getStaticResourcePaths();

        return listOfStaticFiles.stream()
                .collect(Collectors.toMap(key -> key, resourceUrlProvider::getForLookupPath));
    }
}
