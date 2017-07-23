package net.devtales.blog.unit.generator;

import net.devtales.blog.data.model.Article;
import net.devtales.blog.generator.SelectGenerator;
import org.junit.Assert;
import org.junit.Test;

import static net.devtales.blog.generator.SelectGenerator.getColumnNames;

public class GeneratorsTests {
    @Test
    public void canGetColumnNames() {
        String expected = "a._id, a.title, a.slug, a.body, a.summary, a.createdOn, a.updatedOn ";
        String actual = getColumnNames(Article.class, "a");
        Assert.assertEquals(expected, actual);
    }

    @Test
    public void canCreateSelectAllQuery() {
        SelectGenerator<Article> generator = new SelectGenerator<>(Article.class);
        String expected = "SELECT _id, title, slug, body, summary, createdOn, updatedOn FROM T_Article;";
        String actual = generator.selectQuery();
        Assert.assertEquals(expected, actual);
    }
}
