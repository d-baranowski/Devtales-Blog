package net.devtales.blog.api.parser;

import net.devtales.blog.api.model.Article;
import net.devtales.blog.api.model.CreateArticleBody;
import net.devtales.blog.api.model.Tag;
import net.devtales.blog.api.util.Slugify;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Attribute;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;
import org.jsoup.nodes.Document;

@Component
public class CreateArticleBodyToArticleParser {
    private final Slugify slugify;

    public CreateArticleBodyToArticleParser(Slugify slugify) {
        this.slugify = slugify;
    }

    public Article parse(CreateArticleBody input) {
        final Document parsedHtml = Jsoup.parse(input.html);


        final Set<String> keysToRemove = new HashSet<>();
        Iterator<Element> el = parsedHtml.getAllElements().iterator();
        while (el.hasNext()) {
            Element e = el.next();
            for (Attribute a : e.attributes()) {
                if (!a.getKey().equals("class") && !a.getKey().equals("style")) {
                    keysToRemove.add(a.getKey());
                }
            }
        }

        el = parsedHtml.getAllElements().iterator();
        while (el.hasNext()) {
            Element e = el.next();
            for (String atrKey: keysToRemove) {
                e.removeAttr(atrKey);
            }
        }

        final String[] summaryHtml = {""};
        parsedHtml.select(".summary").forEach(element -> summaryHtml[0] += element.outerHtml() + "<br>");

        final Set<Tag> tags = new HashSet<>();
        parsedHtml.getElementsByClass("tag").forEach(element -> {
            tags.add(new Tag(element.text()));
        });

        final String title = parsedHtml.select("h1:first-of-type").text();

        final Article article = new Article();
        article.title = title;
        article.slug = slugify.slugify(title);
        article.html = parsedHtml.html();
        article.jsonRepresentation = input.json;
        article.summary = summaryHtml[0];
        article.tags = tags;

        return article;
    }
}