package net.devtales.blog.logic;

import net.devtales.blog.data.ArticleDAO;
import net.devtales.blog.data.TagDAO;
import net.devtales.blog.data.model.Article;
import net.devtales.blog.logic.composable.CreateTagsThatDontExist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class ArticlesService {

    @Autowired
    ArticleDAO articleDAO;
    @Autowired
    TagDAO tagDAO;
    @Autowired
    CreateTagsThatDontExist createTagsThatDontExist;

    public Article createArticle(Article article) {
        if (article.getId() != null) {
            if (article.getId() != 0) {
                return article;
            }
        }
        article.setCreatedOn(new Timestamp(System.currentTimeMillis()));
        article.setId(articleDAO.create(article));
        createTagsThatDontExist.apply(article.getTags());

        return article;
    }
}
