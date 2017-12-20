package net.devtales.blog.config.transformer;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.resource.ResourceUrlProvider;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class ResourceUrlsMapResolver {
    private final ResourceUrlProvider resourceUrlProvider;

    ResourceUrlsMapResolver(ResourceUrlProvider resourceUrlProvider) {
        this.resourceUrlProvider = resourceUrlProvider;
    }

    public Map<String, String> getRelativeToVersionedUrls() {
        try {
            Path staticFilesDirectory = new ClassPathResource("static").getFile().toPath();
            List<String> listOfStaticFiles = Files.walk(staticFilesDirectory)
                    .filter(path -> path.toFile().isFile())
                    .map(Path::toString)
                    .map(path -> path.replace(staticFilesDirectory.toAbsolutePath().toString(), ""))
                    .map(path -> path.replaceAll("\\\\", "/"))
                    .collect(Collectors.toList());

            return listOfStaticFiles.stream()
                    .collect(Collectors.toMap(key -> key, resourceUrlProvider::getForLookupPath));
        } catch (IOException e) {
            throw new RuntimeException();
        }
    }
}
