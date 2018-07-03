package net.devtales.blog.api.controller;

import net.devtales.blog.api.model.Article;
import net.devtales.blog.api.model.CreateArticleBody;
import net.devtales.blog.api.parser.CreateArticleBodyToArticleParser;
import net.devtales.blog.api.service.ArticlesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.logging.Logger;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/article")
public class ArticleApi {
    private static final Logger log = Logger.getLogger(ArticleApi.class.getName());
    private final ArticlesService service;
    private final CreateArticleBodyToArticleParser parser;

    public ArticleApi(ArticlesService service, CreateArticleBodyToArticleParser parser) {
        this.service = service;
        this.parser = parser;
    }

    @GetMapping()
    public ResponseEntity<Map<String,Article>> getPublished() {
        return ok(service.readPublishedArticles());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Article> getSpecificPublished(@PathVariable String slug) {
        return ok(service.findPublishedArticleByslug(slug));
    }

    @GetMapping("/all/{slug}")
    public ResponseEntity<Article> getSpecificAll(@PathVariable String slug) {
        return ok(service.findArticleBySlug(slug));
    }

    @GetMapping("/all")
    public ResponseEntity<Map<String,Article>> getAll() {
        return ok(service.readAll());
    }

    @PostMapping()
    public ResponseEntity create(@RequestBody CreateArticleBody article) {
        Article result = parser.parse(article);
        Article response = service.createArticle(result);
        log.info("Created article with slug " + response.getSlug());
        return ok(response);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity update(@RequestBody CreateArticleBody article, @PathVariable Long id) {
        Article result = parser.parse(article);
        result.setId(id);
        Article response = service.updateArticle(result);
        log.info("Updated article with slug " + result.getSlug());
        return ok(response);
    }
    //TODO DO THIS https://auth0.com/blog/implementing-jwt-authentication-on-spring-boot/
    @PatchMapping(path = "/{id}")
    public ResponseEntity publish(@PathVariable Long id) {
        return ok(service.publishArticle(id));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity hide(@PathVariable Long id) {
        return ok(service.hide(id));
    }
}

