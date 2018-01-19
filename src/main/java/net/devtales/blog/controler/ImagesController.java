package net.devtales.blog.controler;

import net.devtales.blog.service.FileUploadService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class ImagesController {
    private final ResourcePatternResolver resourcePatternResolver;
    private final FileUploadService fileUploadService;

    public ImagesController(ResourcePatternResolver resourcePatternResolver, FileUploadService fileUploadService) {
        this.resourcePatternResolver = resourcePatternResolver;
        this.fileUploadService = fileUploadService;
    }

    @GetMapping("/file")
    @ResponseBody
    public List<String> listBlogContent() throws IOException {
        return Arrays
                .stream(resourcePatternResolver.getResources("file:blog-content/**"))
                .map((Resource::getFilename))
                .filter(name -> !name.startsWith("thumb-"))
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping("/file")
    @ResponseBody
    public ResponseEntity handleFileUpload(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(fileUploadService.handle(file));
    }
}