package net.devtales.blog.api.service;

import net.devtales.blog.api.exception.ArticleNotFoundException;
import net.devtales.blog.api.exception.BadRequestException;
import net.devtales.blog.api.exception.NotFoundException;
import net.devtales.blog.api.model.Article;
import net.devtales.blog.api.parser.CreateNotExistingTags;
import net.devtales.blog.api.repository.ArticleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ArticlesService {
    private final ArticleRepository articleRepo;
    private final CreateNotExistingTags createNotExistingTags;

    public ArticlesService(ArticleRepository articleRepo, CreateNotExistingTags createNotExistingTags) {
        this.articleRepo = articleRepo;
        this.createNotExistingTags = createNotExistingTags;
    }

    @Transactional
    public Article createArticle(@Valid Article article) {
        final boolean articleAlreadyExists = article.id != null && article.id != 0;
        if (articleAlreadyExists) {
            return article;
        }

        article.createdOn = new Timestamp(System.currentTimeMillis());
        article.tags = createNotExistingTags.apply(article.tags);

        return articleRepo.save(article);
    }

    public Optional<Article> readBySlug(String slug, boolean isAuthorized) {
        Optional<Article> article = Optional.ofNullable(articleRepo.findArticleBySlug(slug));
        if (article.isPresent()) {
            if (article.get().publishedDate != null | isAuthorized) {
                return article;
            }
        }
        return Optional.empty();
    }

    @Transactional
    public Article updateArticle(Article result) {
        Article oldState = articleRepo.findById(result.id).orElseThrow(() -> new ArticleNotFoundException(result.id));
        oldState.tags = createNotExistingTags.apply(result.tags);
        oldState.updatedOn = new Timestamp(System.currentTimeMillis());
        oldState.html = result.html;
        oldState.jsonRepresentation = result.jsonRepresentation;
        oldState.slug = result.slug;
        oldState.summary = result.summary;
        oldState.title = result.title;
        return articleRepo.save(oldState);
    }

    public Map<String, Article> readPublishedArticles() {
        return articleRepo.findArticlesByPublishedDateNotNull().stream().collect(Collectors.toMap(article -> article.slug, article -> article));
    }

    public Map<String, Article> readAll() {
        return StreamSupport.stream(articleRepo.findAll().spliterator(), false)
                .collect(Collectors.toMap(article -> article.slug, article -> article));
    }

    public Article read(Long id) {
        return articleRepo.findById(id).orElseThrow(
                () -> new NotFoundException("Article with id " + id + " does not exist.")
        );
    }

    public Article publishArticle(Long id) {
        Article data = read(id);

        if (data.publishedDate != null) {
            throw new BadRequestException("Article is already published");
        }
        data.publishedDate = new Timestamp(System.currentTimeMillis());
        return articleRepo.save(data);
    }

    public Article hide(Long id) {
        Article data = read(id);

        if (data.publishedDate == null) {
            throw new BadRequestException("Article is not yet published");
        }
        data.publishedDate = null;

        return articleRepo.save(data);
    }

    public Article findPublishedArticleByslug(String slug) {
        Article data = articleRepo.findArticleBySlug(slug);
        if (data == null) {
            throw new NotFoundException("Article with slug " + slug + " does not exist.");
        }
        if (data.publishedDate == null) {
            throw new NotFoundException("Article with slug " + slug + " does not exist.");
        }

        return data;
    }

    public Article findArticleBySlug(String slug) {
        Article data = articleRepo.findArticleBySlug(slug);
        if (data == null) {
            throw new NotFoundException("Article with slug " + slug + " does not exist.");
        }
        return data;
    }
}
