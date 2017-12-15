package net.devtales.blog.cache;

import net.devtales.blog.model.Article;
import net.devtales.blog.repository.ArticleRepository;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class LastChangedArticleTagilator implements DeepETagilator {
    private final ArticleRepository articleRepository;

    public LastChangedArticleTagilator(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @Override
    public String tagilate(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String[] path = request.getRequestURI().split("/");
        String articleSlug = path[path.length - 1];
        Article article = this.articleRepository.findArticleBySlug(articleSlug);

        if (article == null) {
            return null;
        }

        return article.getUpdatedOn() != null ?
                article.getUpdatedOn().toString() : article.getCreatedOn().toString();
    }
}
