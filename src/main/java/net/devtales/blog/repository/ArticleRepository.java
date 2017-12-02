package net.devtales.blog.repository;

import net.devtales.blog.model.Article;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ArticleRepository extends CrudRepository<Article, Long> {
    Article findArticleBySlug(String slug);
    List<Article> findArticlesByPublishedDateNotNull();
}
