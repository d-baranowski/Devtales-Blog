package net.devtales.blog.data.repository;

import net.devtales.blog.data.model.Article;
import org.springframework.data.repository.CrudRepository;

public interface ArticleRepository extends CrudRepository<Article, Long> {
}
