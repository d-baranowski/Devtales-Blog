package net.devtales.blog.state;

import net.devtales.blog.model.Article;

import java.util.stream.Collectors;
import java.util.stream.Stream;

public class StateModel {
    private AdminReducer adminReducer;
    private ArticleReducer articleReducer;

    public StateModel(boolean isAdmin, Article... articles) {
        this.setAdminReducer(
                new AdminReducer().setAdmin(isAdmin))
            .setArticleReducer(
                new ArticleReducer().setArticles(Stream.of(articles)
                        .collect(Collectors.toMap(Article::getSlug, article -> article))));
    }

    public AdminReducer getAdminReducer() {
        return adminReducer;
    }

    public StateModel setAdminReducer(AdminReducer adminReducer) {
        this.adminReducer = adminReducer;
        return this;
    }

    public ArticleReducer getArticleReducer() {
        return articleReducer;
    }

    public StateModel setArticleReducer(ArticleReducer articleReducer) {
        this.articleReducer = articleReducer;
        return this;
    }
}
