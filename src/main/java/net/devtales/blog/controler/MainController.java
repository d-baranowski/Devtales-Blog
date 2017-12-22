package net.devtales.blog.controler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jdk.nashorn.api.scripting.JSObject;
import net.devtales.blog.cache.CacheControl;
import net.devtales.blog.cache.CachePolicy;
import net.devtales.blog.cache.DeepETagger;
import net.devtales.blog.cache.FrontEndBundleTagilator;
import net.devtales.blog.cache.LastChangedArticleTagilator;
import net.devtales.blog.cache.LatestChangedArticleTagilator;
import net.devtales.blog.exception.NotFoundException;
import net.devtales.blog.jsengine.CachedReact;
import net.devtales.blog.model.Article;
import net.devtales.blog.service.ArticlesService;
import net.devtales.blog.service.ReactRenderingService;
import net.devtales.blog.state.StateModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
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
    private final ReactRenderingService render;
    private final ObjectMapper objectMapper;
    private final ResourcePatternResolver resourcePatternResolver;

    @Autowired
    MainController(ArticlesService service, ObjectMapper objectMapper, ResourcePatternResolver resourcePatternResolver, ReactRenderingService render) {
        this.service = service;
        this.objectMapper = objectMapper;
        this.resourcePatternResolver = resourcePatternResolver;
        this.render = render;
    }

    @GetMapping({"/", "/blog"})
    @DeepETagger(eTagger = {LatestChangedArticleTagilator.class, FrontEndBundleTagilator.class})
    @CacheControl(
            policy = CachePolicy.PUBLIC,
            maxAge = 60 * 60 * 60,
            staleIfError = 7 * 24 * 60 * 60 * 60,
            staleWhileRevalidate = 24 * 60 * 60 * 60)
    @PreAuthorize("permitAll()")
    public String index(final Map<String, Object> model, Authentication authentication, HttpServletRequest request) throws Exception {
        return render.serverSideReact(model, isAdmin(authentication), request.getRequestURI());
    }

    @GetMapping({"/about", "/projects"})
    @PreAuthorize("permitAll()")
    @DeepETagger(eTagger = {FrontEndBundleTagilator.class})
    @CacheControl(
            policy = CachePolicy.PUBLIC,
            maxAge = 24 * 60 * 60 * 60,
            staleIfError = 7 * 24 * 60 * 60 * 60,
            staleWhileRevalidate = 2 * 24 * 60 * 60 * 60)
    public String staticPages(final Map<String, Object> model, Authentication authentication, HttpServletRequest request) {
        return render.serverSideReact(model, isAdmin(authentication), request.getRequestURI());
    }

    @GetMapping("/article/{slug}")
    @PreAuthorize("permitAll()")
    @CacheControl(
            policy = CachePolicy.PUBLIC,
            maxAge = 60 * 60 * 60,
            staleIfError = 7 * 24 * 60 * 60 * 60,
            staleWhileRevalidate = 24 * 60 * 60 * 60)
    @DeepETagger(eTagger = {LastChangedArticleTagilator.class, FrontEndBundleTagilator.class})
    public String readArticle(@PathVariable String slug, final Map<String, Object> model, Authentication authentication, HttpServletRequest request) throws JsonProcessingException {
        final boolean isAdmin = authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> Objects.equals(a.getAuthority(), "ADMIN"));

        Optional<Article> optArticle = service.readBySlug(slug,isAdmin);

        if (optArticle.isPresent()) {
            final StateModel stateObject = new StateModel(isAdmin, optArticle.get());
            final String preState = objectMapper.writeValueAsString(stateObject);

            return render.serverSideReact(model, isAdmin(authentication), request.getRequestURI(), preState);
        }

        throw new NotFoundException("Article with slug " + slug + " was not found.");
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

    public static boolean isAdmin(Authentication authentication) {
        return authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> Objects.equals(a.getAuthority(), "ADMIN"));
    }
}
