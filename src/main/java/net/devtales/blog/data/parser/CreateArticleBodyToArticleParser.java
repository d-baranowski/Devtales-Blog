package net.devtales.blog.data.parser;

import net.devtales.blog.controler.model.CreateArticleBody;
import net.devtales.blog.data.model.Article;
import net.devtales.blog.data.model.Tag;
import net.devtales.blog.data.parser.annotation.Parser;
import net.devtales.blog.data.parser.util.SingletonSlugify;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Attribute;
import org.jsoup.nodes.Attributes;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.*;

@Parser(input = CreateArticleBody.class, output = Article.class)
public class CreateArticleBodyToArticleParser extends ParsesInto<CreateArticleBody, Article>{

    private static CreateArticleBodyToArticleParser instance;

    public static CreateArticleBodyToArticleParser getInstance() {
        if (instance == null) {
            instance = new CreateArticleBodyToArticleParser();
        }
        return instance;
    }

    @Override
    public Article parse(CreateArticleBody input) {
        Document parsedHtml = Jsoup.parse(input.getHtml());


        Set<String> keysToRemove = new HashSet<>();
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



        Article result = new Article();

        result.setTitle(parsedHtml.select("h1:first-of-type").text());
        result.setSlug(SingletonSlugify.getInstance().slugify(result.getTitle()));
        result.setHtml(parsedHtml.html());
        result.setJsonRepresentation(input.getJson());
        final String[] summaryHtml = {""};
        parsedHtml.select(".summary").forEach(element -> summaryHtml[0] += element.outerHtml() + "<br>");
        result.setSummary(summaryHtml[0]);
        Set<String> tags = new HashSet<>();
        parsedHtml.getElementsByClass("tag").forEach(element -> {
            tags.add(element.text());
        });

        List<Tag> convertedTags = new ArrayList<>();
        for (String t: tags) {
            convertedTags.add(new Tag(t));
        }
        result.setTags(convertedTags);

        return result;
    }
}
