package net.devtales.blog.cache;

import net.devtales.blog.repository.ArticleRepository;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;

@Component
public class LatestChangedArticleTagilator implements DeepETagilator {
    private final ArticleRepository articleRepository;

    public LatestChangedArticleTagilator(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @Override
    public String tagilate(HttpServletRequest request, HttpServletResponse response, Object handler) {
        Timestamp latest =  articleRepository.findLatestUpdatedTimestamp();

        if (latest == null) {
            return null;
        }

        return articleRepository.findLatestUpdatedTimestamp().toString();
    }
}
