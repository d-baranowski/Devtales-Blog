package net.devtales.blog.controler;

import net.devtales.blog.controler.model.CreateArticleBody;
import net.devtales.blog.data.model.Article;
import net.devtales.blog.data.parser.CreateArticleBodyToArticleParserAlsoCreatesTagsIfTheyDontExsistSorryFutureMe;
import net.devtales.blog.service.ArticlesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.ResponseEntity.badRequest;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/article")
public class ArticleApi {
    private final ArticlesService service;
    private final CreateArticleBodyToArticleParserAlsoCreatesTagsIfTheyDontExsistSorryFutureMe parser;

    public ArticleApi(ArticlesService service, CreateArticleBodyToArticleParserAlsoCreatesTagsIfTheyDontExsistSorryFutureMe parser) {
        this.service = service;
        this.parser = parser;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity getAll() {
        return badRequest().build();
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public ResponseEntity get(@PathVariable int id) {
        return badRequest().build();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity create(@RequestBody CreateArticleBody article) {
        Article result = parser.parse(article);
        return ok(service.createArticle(result));
    }
}

