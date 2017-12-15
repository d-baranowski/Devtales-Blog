package net.devtales.blog;

import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ResourceUrlsMapResolver {

    public Map<String, String> getRelativeToVersionedUrls() {
        try {
            Path staticFilesDirectory = new ClassPathResource("static").getFile().toPath();
            List<String> listOfStaticFiles = Files.walk(staticFilesDirectory).filter(path -> path.toFile().isFile()).map(path -> path.toString()).map(path -> path.replace(staticFilesDirectory.toAbsolutePath().toString(), "")).collect(Collectors.toList());

        } catch (IOException e) {
            throw new RuntimeException();
        }

        return null;
    }
}
