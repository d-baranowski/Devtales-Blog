package net.devtales.blog.api.model;

public class CreateArticleBody {
    public String html;
    public String json;

    public CreateArticleBody() {}

    public CreateArticleBody(String html, String json) {
        this.html = html;
        this.json = json;
    }

    public String getHtml() {
        return html;
    }

    public void setHtml(String html) {
        this.html = html;
    }

    public String getJson() {
        return json;
    }

    public void setJson(String json) {
        this.json = json;
    }
}
