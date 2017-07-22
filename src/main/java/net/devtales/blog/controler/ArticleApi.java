package net.devtales.blog.controler;

import net.devtales.blog.data.ArticleDAO;
import net.devtales.blog.data.exceptions.DataManipulationFailedException;
import net.devtales.blog.data.model.Article;
import net.devtales.blog.data.model.Gowno;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/article")
public class ArticleApi {
    private final ArticleDAO dao;

    @Autowired
    ArticleApi(ArticleDAO dao) {
        this.dao = dao;
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public Article get(@PathVariable int id) {
        return new Article();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity create(@RequestBody @Valid Article article) {
        try {
            dao.create(article);
        } catch (DataManipulationFailedException e) {
            return new ResponseEntity<>( e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

