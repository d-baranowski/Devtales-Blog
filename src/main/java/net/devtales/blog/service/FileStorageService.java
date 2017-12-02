package net.devtales.blog.service;

import com.google.common.io.Files;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Component
public class FileStorageService {

    public String store(MultipartFile file) {
        String fileName = UUID.randomUUID().toString() + "." + extractFileExtension(file.getOriginalFilename());
        File serverFile = new File("blog-content/" + fileName);
        try {
            Files.createParentDirs(serverFile);
            serverFile.createNewFile();
            Files.write(file.getBytes(), serverFile);
            return fileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file",e);
        }
    }

    private String extractFileExtension(String fileName) {
        String[] splitted = fileName.split("\\.");
        return splitted[splitted.length - 1];
    }
}
