package net.devtales.blog.data.model;

import lombok.Getter;
import lombok.Setter;

public class CreateArticleBody {
    @Getter @Setter
    private String html;
    @Getter @Setter
    private String json;
}
