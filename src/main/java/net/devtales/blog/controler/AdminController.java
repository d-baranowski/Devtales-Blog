package net.devtales.blog.controler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.devtales.blog.model.Article;
import net.devtales.blog.service.ArticlesService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

@Controller
public class AdminController {
    private final ArticlesService service;
    private final ObjectMapper objectMapper;

    public AdminController(ArticlesService service, ObjectMapper objectMapper) {
        this.service = service;
        this.objectMapper = objectMapper;
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
}
