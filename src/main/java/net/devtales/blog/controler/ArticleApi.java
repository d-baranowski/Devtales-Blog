package net.devtales.blog.controler;

import net.devtales.blog.data.ArticleDAO;
import net.devtales.blog.data.ValidatorPool;
import net.devtales.blog.data.model.Article;
import net.devtales.blog.controler.model.CreateArticleBody;
import net.devtales.blog.data.parser.CreateArticleBodyToArticleParser;
import net.devtales.commons.data.exceptions.DataManipulationFailedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolation;
import javax.validation.Valid.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/article")
public class ArticleApi {
    private final ArticleDAO dao;

    @Autowired
    ArticleApi(ArticleDAO dao) {
        this.dao = dao;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Article> getAll() {
        return dao.readAll();
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public Article get(@PathVariable int id) {
        return new Article();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity create(@RequestBody CreateArticleBody article) throws DataManipulationFailedException {
        Article result = CreateArticleBodyToArticleParser.getInstance().parse(article);
        Set<ConstraintViolation<Article>> validationConstraints = ValidatorPool.getValidator().validate(result);

        if (validationConstraints.isEmpty()) {
            result.setCreatedOn(new Timestamp(System.currentTimeMillis()));

            dao.create(result);
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
    }
}

