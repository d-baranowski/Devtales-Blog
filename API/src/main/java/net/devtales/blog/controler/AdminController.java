package net.devtales.blog.controler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import net.devtales.blog.model.Article;
import net.devtales.blog.service.ArticlesService;
import net.devtales.blog.state.StateModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
@Slf4j
public class AdminController {
    private final ArticlesService service;
    private final ObjectMapper objectMapper;


    public AdminController(ArticlesService service, ObjectMapper objectMapper) {
        this.service = service;
        this.objectMapper = objectMapper;
    }

    @GetMapping(path = "/admin")
    public String admin(HttpServletRequest request) {
        log.info("Accessing admin endpoint from address " + request.getRemoteAddr());
        return "admin";
    }

    @GetMapping(path = "/admin/{articleId}")
    public String adminEdit(@PathVariable Long articleId, final Map<String, Object> model) throws JsonProcessingException {
        Article result = service.read(articleId);
        final StateModel stateObject = new StateModel(true, result);
        stateObject.getArticleReducer().setUpdating(result);

        final String preState = objectMapper.writeValueAsString(stateObject);
        model.put("state", preState);
        return "admin";
    }
}
