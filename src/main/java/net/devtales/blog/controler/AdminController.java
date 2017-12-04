package net.devtales.blog.controler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.devtales.blog.model.Article;
import net.devtales.blog.service.ArticlesService;
import net.devtales.blog.service.FileStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Map;

@Controller
public class AdminController {
    private final ArticlesService service;
    private final ObjectMapper objectMapper;
    private final FileStorageService storageService;

    public AdminController(ArticlesService service, ObjectMapper objectMapper, FileStorageService storageService) {
        this.service = service;
        this.objectMapper = objectMapper;
        this.storageService = storageService;
    }

    @GetMapping(path = "/admin")
    public String admin() {
        return "admin";
    }

    @GetMapping(path = "/admin/{articleId}")
    public String adminEdit(@PathVariable Long articleId, final Map<String, Object> model) throws JsonProcessingException {
        Article result = service.read(articleId);
        String articleJson = objectMapper.writeValueAsString(result);
        String state = "{articleReducer: {updating: "+articleJson+"}, adminReducer:{isAdmin: true}}";
        model.put("state", state);
        return "admin";
    }

    @PreAuthorize("permitAll()")
    @PostMapping("/file")
    @ResponseBody
    public ResponseEntity handleFileUpload(@RequestParam("file") MultipartFile file) {
        String fileName = storageService.store(file);
        storageService.thumbnail(fileName);
        return ResponseEntity.ok(fileName);
    }
}
