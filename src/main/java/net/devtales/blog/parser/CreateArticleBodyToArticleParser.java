package net.devtales.blog.parser;

import net.devtales.blog.model.Article;
import net.devtales.blog.model.CreateArticleBody;
import net.devtales.blog.model.Tag;
import net.devtales.blog.util.Slugify;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Attribute;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

@Component
public class CreateArticleBodyToArticleParser {
    private final Slugify slugify;

    public CreateArticleBodyToArticleParser(Slugify slugify) {
        this.slugify = slugify;
    }

    public Article parse(CreateArticleBody input) {
        final Document parsedHtml = Jsoup.parse(input.getHtml());


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

        return new Article()
                .setTitle(title)
                .setSlug(slugify.slugify(title))
                .setHtml(parsedHtml.html())
                .setJsonRepresentation(input.getJson())
                .setSummary(summaryHtml[0])
                .setTags(tags);
    }
}
