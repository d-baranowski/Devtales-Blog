package net.devtales.blog.controler;

import net.devtales.blog.controler.model.CreateArticleBody;
import net.devtales.blog.data.ArticleDAO;
import net.devtales.blog.data.ValidatorPool;
import net.devtales.blog.data.model.Article;
import net.devtales.blog.data.parser.CreateArticleBodyToArticleParser;
import net.devtales.blog.logic.ArticlesService;
import net.devtales.commons.data.exceptions.DataManipulationFailedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolation;
import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

import static org.springframework.http.ResponseEntity.badRequest;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/api/article")
public class ArticleApi {
    private final ArticlesService service;

    @Autowired
    ArticleApi(ArticlesService service) {
        this.service = service;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity getAll() {
        return badRequest().build();
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public Article get(@PathVariable int id) {
        return new Article();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity create(@RequestBody CreateArticleBody article) throws DataManipulationFailedException, ClassNotFoundException {
        Article result = CreateArticleBodyToArticleParser.getInstance().parse(article);
        Set<ConstraintViolation<Article>> validationConstraints = ValidatorPool.getValidator().validate(result);

        if (validationConstraints.isEmpty()) {
            return ok(service.createArticle(result));
        }

        return status(HttpStatus.EXPECTATION_FAILED).body(validationConstraints);
    }
}

