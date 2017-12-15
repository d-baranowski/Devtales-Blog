package net.devtales.blog.controler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jdk.nashorn.api.scripting.JSObject;
import net.devtales.blog.jsengine.CachedReact;
import net.devtales.blog.model.Article;
import net.devtales.blog.service.ArticlesService;
import net.devtales.blog.state.StateModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.HttpClientErrorException;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
public class MainController {
    private final ArticlesService service;
    private final CachedReact react;
    private final ObjectMapper objectMapper;
    private final ResourcePatternResolver resourcePatternResolver;

    @Autowired
    MainController(ArticlesService service, ObjectMapper objectMapper, ResourcePatternResolver resourcePatternResolver, CachedReact react) {
        this.service = service;
        this.objectMapper = objectMapper;
        this.resourcePatternResolver = resourcePatternResolver;
        this.react = react;
    }

    @GetMapping({"/", "/blog"})
    @PreAuthorize("permitAll()")
    public String index(final Map<String, Object> model, Authentication authentication, HttpServletRequest request) throws Exception {
        final boolean isAdmin = authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> Objects.equals(a.getAuthority(), "ADMIN"));
        String preState = "{\"adminReducer\":{\"isAdmin\":"+isAdmin+"}}";
        JSObject renderResult = react.render(request.getRequestURI(), preState);
        String html = String.valueOf(renderResult.getMember("html"));
        String state = String.valueOf(renderResult.getMember("state"));
        model.put("content", html);
        model.put("state", state);
        model.put("isAdmin", isAdmin);
        return "index";
    }

    @GetMapping("/article/{slug}")
    @PreAuthorize("permitAll()")
    public String readArticle(@PathVariable String slug, final Map<String, Object> model, Authentication authentication, HttpServletRequest request) throws JsonProcessingException {
        final boolean isAdmin = authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> Objects.equals(a.getAuthority(), "ADMIN"));

        Optional<Article> optArticle = service.readBySlug(slug,isAdmin);

        if (optArticle.isPresent()) {
            final StateModel stateObject = new StateModel(isAdmin, optArticle.get());
            final String preState = objectMapper.writeValueAsString(stateObject);

            JSObject renderResult = react.render(request.getRequestURI(), preState);
            String html = String.valueOf(renderResult.getMember("html"));
            String state = String.valueOf(renderResult.getMember("state"));
            model.put("content", html);
            model.put("state", state);
            model.put("isAdmin", isAdmin);
            return "index";
        }

        throw new HttpClientErrorException(HttpStatus.NOT_FOUND);
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
}
