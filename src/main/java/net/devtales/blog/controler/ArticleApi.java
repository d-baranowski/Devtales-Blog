package net.devtales.blog.controler;

import net.devtales.blog.data.ArticleDAO;
import net.devtales.blog.data.exceptions.DataManipulationFailedException;
import net.devtales.blog.data.model.Article;
import net.devtales.blog.data.model.CreateArticleBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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
    public ResponseEntity create(@RequestBody CreateArticleBody article) {
        CreateArticleBody anotherVariable = article;

        return new ResponseEntity<>(HttpStatus.OK);
    }
}

