package net.devtales.blog.service;

import net.devtales.blog.data.ArticleDAO;
import net.devtales.blog.data.model.Article;
import net.devtales.blog.data.model.Tag;
import net.devtales.blog.service.composable.CreateTagsThatDontExist;
import net.devtales.commons.data.exceptions.DataManipulationFailedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;

@Service
public class ArticlesService {

    @Autowired
    private ArticleDAO articleDAO;
    @Autowired
    private CreateTagsThatDontExist createTagsThatDontExist;

    @Transactional
    public Article createArticle(Article article) throws ClassNotFoundException, DataManipulationFailedException {
        if (article.getId() != null) {
            if (article.getId() != 0) {
                return article;
            }
        }
        article.setCreatedOn(new Timestamp(System.currentTimeMillis()));
        article.setId(articleDAO.create(article));
        createTagsThatDontExist.apply(article.getTags());
        for (Tag t : article.getTags()) {
            articleDAO.link(article, t);
        }

        return article;
    }
}
