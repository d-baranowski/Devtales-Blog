package net.devtales.blog.controler;

import net.devtales.blog.model.CreateArticleBody;
import net.devtales.blog.model.Article;
import net.devtales.blog.parser.CreateArticleBodyToArticleParser;
import net.devtales.blog.service.ArticlesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.ResponseEntity.badRequest;
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

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Article>> getAll() {
        return ok(service.readAll());
    }

    //This isn't used yet I think.
    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public ResponseEntity get(@PathVariable Long id) {
        return ok(service.read(id));
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity create(@RequestBody CreateArticleBody article) {
        Article result = parser.parse(article);
        return ok(service.createArticle(result));
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/{id}")
    public ResponseEntity update(@RequestBody CreateArticleBody article, @PathVariable Long id) {
        Article result = parser.parse(article);
        result.setId(id);
        return ok(service.updateArticle(result));
    }
}

