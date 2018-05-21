package net.devtales.blog.cache;


import net.devtales.blog.model.Article;
import net.devtales.blog.repository.ArticleRepository;
import net.devtales.blog.service.ArticlesService;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;
import java.util.Map;

@Component
public class SpecificArticleChangedTagilator implements DeepETagilator {
    private final ArticlesService articlesService;

    public SpecificArticleChangedTagilator(ArticlesService articlesService) {
        this.articlesService = articlesService;
    }

    @Override
    public String tagilate(HttpServletRequest request, HttpServletResponse response, Object handler) {
        Map<String, String> map = (Map) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        String slug = map.get("slug");
        Article article = articlesService.findPublishedArticleByslug(slug);

        return article.getUpdatedOn() != null ? article.getUpdatedOn().toString() : article.getPublishedDate().toString();
    }
}
