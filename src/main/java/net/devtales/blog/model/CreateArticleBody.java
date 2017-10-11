package net.devtales.blog.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CreateArticleBody {
    private String html;
    private String json;

    public CreateArticleBody() {}

    public CreateArticleBody(String html, String json) {
        this.html = html;
        this.json = json;
    }
}
