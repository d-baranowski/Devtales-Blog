package net.devtales.blog.unit.generator;

import net.devtales.blog.data.model.Article;
import net.devtales.commons.generator.SelectGenerator;
import org.junit.Assert;
import org.junit.Test;

import static net.devtales.commons.generator.SelectGenerator.getColumnNames;

public class GeneratorsTests {
    @Test
    public void canGetColumnNames() {
        String expected = "a._id, a.title, a.slug, a.html, a.summary, a.createdOn, a.updatedOn, a.jsonRepresentation ";
        String actual = getColumnNames(Article.class, "a");
        Assert.assertEquals(expected, actual);
    }

    @Test
    public void canCreateSelectAllQuery() {
        SelectGenerator<Article> generator = new SelectGenerator<>(Article.class);
        String expected = "SELECT _id, title, slug, html, summary, createdOn, updatedOn, jsonRepresentation FROM T_Article;";
        String actual = generator.selectQuery();
        Assert.assertEquals(expected, actual);
    }
}
