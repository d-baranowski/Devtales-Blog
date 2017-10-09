package net.devtales.blog.data.parser;

import net.devtales.blog.controler.model.CreateArticleBody;
import net.devtales.blog.data.model.Article;
import net.devtales.blog.data.model.Tag;
import net.devtales.blog.data.parser.util.SingletonSlugify;
import net.devtales.blog.data.repository.TagRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Attribute;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

@Component
public class CreateArticleBodyToArticleParserAlsoCreatesTagsIfTheyDontExsistSorryFutureMe {
    private final TagRepository tagRepository;

    public CreateArticleBodyToArticleParserAlsoCreatesTagsIfTheyDontExsistSorryFutureMe(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
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
            Tag tag = tagRepository.findByValue(element.text());
            if (tag != null) {
                tags.add(tag);
            } else {
                tags.add(tagRepository.save(new Tag(element.text())));
            }
        });

        final String title = parsedHtml.select("h1:first-of-type").text();

        return Article.builder()
                .title(title)
                .slug(SingletonSlugify.getInstance().slugify(title))
                .html(parsedHtml.html())
                .jsonRepresentation(input.getJson())
                .summary(summaryHtml[0])
                .tags(tags)
                .build();
    }
}
