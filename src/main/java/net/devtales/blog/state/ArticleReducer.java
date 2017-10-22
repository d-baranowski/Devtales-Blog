package net.devtales.blog.state;

import net.devtales.blog.model.Article;

import java.util.Map;

public class ArticleReducer {
    private Map<String, Article> articles;

    public Map<String, Article> getArticles() {
        return articles;
    }

    public ArticleReducer setArticles(Map<String, Article> articles) {
        this.articles = articles;
        return this;
    }
}
