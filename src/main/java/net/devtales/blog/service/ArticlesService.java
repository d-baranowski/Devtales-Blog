package net.devtales.blog.service;

import com.google.common.collect.Sets;
import net.devtales.blog.data.model.Article;
import net.devtales.blog.data.model.Tag;
import net.devtales.blog.data.repository.ArticleRepository;
import net.devtales.blog.data.repository.TagRepository;
import net.devtales.blog.service.composable.CreateTagsThatDontExist;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Entity;
import java.sql.Timestamp;
import java.util.HashSet;

@Service
public class ArticlesService {
    private final ArticleRepository articleRepo;
    private final TagRepository tagRepo;
    private final CreateTagsThatDontExist createTagsThatDontExist;

    public ArticlesService(ArticleRepository articleRepo,
                           TagRepository tagRepo,
                           CreateTagsThatDontExist createTagsThatDontExist) {
        this.articleRepo = articleRepo;
        this.tagRepo = tagRepo;
        this.createTagsThatDontExist = createTagsThatDontExist;
    }


    @Transactional
    public Article createArticle(Article article) {
        if (article.getId() != null) {
            if (article.getId() != 0) {
                return article;
            }
        }
        HashSet<Tag> existingTags = Sets.newHashSet(tagRepo.findAll());
        article.setCreatedOn(new Timestamp(System.currentTimeMillis()));
        existingTags.forEach(existingTag -> {
           article.getTags().stream()
                   .filter(tag -> tag.getValue().equals(existingTag.getValue()))
                   .findFirst().ifPresent(tag -> {
                       tag = existingTag;
                    });
                   });
        return articleRepo.save(article);
    }
}
