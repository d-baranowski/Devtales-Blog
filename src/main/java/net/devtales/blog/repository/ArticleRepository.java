package net.devtales.blog.repository;

import net.devtales.blog.model.Article;
import org.springframework.data.repository.CrudRepository;

public interface ArticleRepository extends CrudRepository<Article, Long> {
}
