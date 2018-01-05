package net.devtales.blog.state;

import net.devtales.blog.model.Article;

import java.util.Map;

public class ArticleReducer {
    private Map<String, Article> articles;
    private Article updating;

    public Article getUpdating() {
        return updating;
    }

    public void setUpdating(Article updating) {
        this.updating = updating;
    }

    public Map<String, Article> getArticles() {
        return articles;
    }

    public ArticleReducer setArticles(Map<String, Article> articles) {
        this.articles = articles;
        return this;
    }
}
