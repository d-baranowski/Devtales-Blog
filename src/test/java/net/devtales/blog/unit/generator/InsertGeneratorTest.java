package net.devtales.blog.unit.generator;

import net.devtales.blog.data.model.Article;
import net.devtales.blog.generator.InsertGenerator;
import org.junit.Assert;
import org.junit.Test;

public class InsertGeneratorTest {

    @Test
    public void canGenerateSqlForArticleTable() {
        String actual = InsertGenerator.generateInsertQuery(Article.class);
        String expected = "INSERT INTO T_Article(title, body) VALUES (?, ?);";

        Assert.assertEquals(expected, actual);
    }

    @Test
    public void canGetArguments() throws IllegalAccessException {
        Object[] expected = new Object[] { "Siema", "Heniu" };

        Article article = new Article();
        article.setTitle("Siema");
        article.setBody("Heniu");

        Object[] actual = InsertGenerator.getArguments(article, false);

        Assert.assertArrayEquals(expected, actual);
    }
}
