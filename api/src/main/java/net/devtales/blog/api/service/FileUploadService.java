package net.devtales.blog.api.service;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileUploadService {
    private final FileStorageService storageService;

    public FileUploadService(FileStorageService storageService) {
        this.storageService = storageService;
    }

    public String handle(MultipartFile file) {
        String fileName = storageService.store(file);
        storageService.thumbnail(fileName);
        return fileName;
    }
}
