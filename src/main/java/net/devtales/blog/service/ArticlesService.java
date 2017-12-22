package net.devtales.blog.service;

import com.google.common.collect.Lists;
import net.devtales.blog.BadRequestException;
import net.devtales.blog.exception.NotFoundException;
import net.devtales.blog.model.Article;
import net.devtales.blog.parser.CreateNotExistingTags;
import net.devtales.blog.repository.ArticleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class ArticlesService {
    private final ArticleRepository articleRepo;
    private final CreateNotExistingTags createNotExistingTags;

    public ArticlesService(ArticleRepository articleRepo, CreateNotExistingTags createNotExistingTags) {
        this.articleRepo = articleRepo;
        this.createNotExistingTags = createNotExistingTags;
    }

    @Transactional
    public Article createArticle(Article article) {
        if (article.getId() != null && article.getId() != 0) {
            return article;
        }

        article.setCreatedOn(new Timestamp(System.currentTimeMillis()));
        article.setTags(createNotExistingTags.apply(article.getTags()));

        return articleRepo.save(article);
    }

    public Optional<Article> readBySlug(String slug, boolean isAuthorized) {
        Optional<Article> article = Optional.ofNullable(articleRepo.findArticleBySlug(slug));
        if (article.isPresent()) {
            if (article.get().getPublishedDate() != null | isAuthorized) {
                return article;
            }
        }
        return Optional.empty();
    }

    @Transactional
    public Article updateArticle(Article result) {
        Article oldState = articleRepo.findOne(result.getId());
        oldState.setTags(createNotExistingTags.apply(result.getTags()));
        oldState.setUpdatedOn(new Timestamp(System.currentTimeMillis()));
        oldState.setHtml(result.getHtml());
        oldState.setJsonRepresentation(result.getJsonRepresentation());
        oldState.setSlug(result.getSlug());
        oldState.setSummary(result.getSummary());
        oldState.setTitle(result.getTitle());
        return articleRepo.save(oldState);
    }

    public List<Article> readPublishedArticles() {
        return articleRepo.findArticlesByPublishedDateNotNull();
    }

    public List<Article> readAll() {
        return Lists.newArrayList(articleRepo.findAll());
    }

    public Article read(Long id) {
        Article data = articleRepo.findOne(id);
        if (data == null) {
            throw new NotFoundException("Article with id " + id + " does not exist.");
        }
        return data;
    }

    public Article publishArticle(Long id) {
        Article data = articleRepo.findOne(id);
        if (data == null) {
            throw new NotFoundException("Article with id " + id + " does not exist.");
        }
        if (data.getPublishedDate() != null) {
            throw new BadRequestException("Article is already published");
        }
        data.setPublishedDate(new Timestamp(System.currentTimeMillis()));
        return articleRepo.save(data);
    }

    public Article hide(Long id) {
        Article data = articleRepo.findOne(id);
        if (data == null) {
            throw new NotFoundException("Article with id " + id + " does not exist.");
        }
        if (data.getPublishedDate() == null) {
            throw new BadRequestException("Article is not yet published");
        }
        data.setPublishedDate(null);
        return articleRepo.save(data);
    }
}
