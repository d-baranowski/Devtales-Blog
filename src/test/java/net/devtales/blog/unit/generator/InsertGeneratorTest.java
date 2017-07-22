package net.devtales.blog.unit.generator;

import net.devtales.blog.data.model.Article;
import org.junit.Assert;
import org.junit.Test;

import java.util.List;

import static net.devtales.blog.unit.generator.InsertGenerator.generateInsertQuery;
import static net.devtales.blog.unit.generator.InsertGenerator.getArguments;

public class InsertGeneratorTest {

    @Test
    public void canGenerateSqlForArticleTable() {
        String actual = generateInsertQuery(Article.class);
        String expected = "INSERT INTO T_Article(title, body) VALUES (?, ?);";

        Assert.assertEquals(expected, actual);
    }

    @Test
    public void canGetArguments() throws IllegalAccessException {
        Object[] expected = new Object[] { "Siema", "Heniu" };

        Article article = new Article();
        article.setTitle("Siema");
        article.setBody("Heniu");

        Object[] actual = getArguments(article, false);

        Assert.assertArrayEquals(expected, actual);
    }
}
