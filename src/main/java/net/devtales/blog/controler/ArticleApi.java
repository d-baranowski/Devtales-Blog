package net.devtales.blog.controler;

import net.devtales.blog.model.Article;
import net.devtales.blog.model.CreateArticleBody;
import net.devtales.blog.parser.CreateArticleBodyToArticleParser;
import net.devtales.blog.service.ArticlesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Map<String,Article>> getAll() {
        return ok(service.readAll().stream().collect(Collectors.toMap(Article::getSlug, article -> article)));
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

