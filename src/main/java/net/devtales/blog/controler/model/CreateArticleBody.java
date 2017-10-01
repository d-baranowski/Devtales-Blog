package net.devtales.blog.controler.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CreateArticleBody {
    private String html;
    private String json;

    public CreateArticleBody(String html, String json) {
        this.html = html;
        this.json = json;
    }
}
