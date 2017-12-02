package net.devtales.blog.controler;

import net.devtales.blog.model.Article;
import net.devtales.blog.model.CreateArticleBody;
import net.devtales.blog.parser.CreateArticleBodyToArticleParser;
import net.devtales.blog.service.ArticlesService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
import java.util.stream.Collectors;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/article")
public class ArticleApi {
    private final ArticlesService service;
    private final CreateArticleBodyToArticleParser parser;

    public ArticleApi(ArticlesService service, CreateArticleBodyToArticleParser parser) {
        this.service = service;
        this.parser = parser;
    }

    @GetMapping()
    @PreAuthorize("permitAll()")
    public ResponseEntity<Map<String,Article>> getPublished() {
        return ok(service.readPublishedArticles().stream().collect(Collectors.toMap(Article::getSlug, article -> article)));
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Map<String,Article>> getAll() {
        return ok(service.readAll().stream().collect(Collectors.toMap(Article::getSlug, article -> article)));
    }

    @PostMapping()
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity create(@RequestBody CreateArticleBody article) {
        Article result = parser.parse(article);
        return ok(service.createArticle(result));
    }

    @PutMapping(path = "/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity update(@RequestBody CreateArticleBody article, @PathVariable Long id) {
        Article result = parser.parse(article);
        result.setId(id);
        return ok(service.updateArticle(result));
    }

    @PatchMapping(path = "/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity publish(@PathVariable Long id) {
        return ok(service.publishArticle(id));
    }

    @DeleteMapping(path = "/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity hide(@PathVariable Long id) {
        return ok(service.hide(id));
    }
}

