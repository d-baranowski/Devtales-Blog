package net.devtales.blog.unit.generator;

import net.devtales.blog.data.model.Article;
import net.devtales.blog.generator.InsertGenerator;
import org.junit.Assert;
import org.junit.Test;

import java.sql.Timestamp;

public class InsertGeneratorTest {

    @Test
    public void canGenerateSqlForArticleTable() {
        String actual = InsertGenerator.generateInsertQuery(Article.class);
        String expected = "INSERT INTO T_Article(title, slug, body, summary, createdOn, updatedOn) VALUES (?, ?, ?, ?, ?, ?);";

        Assert.assertEquals(expected, actual);
    }

    @Test
    public void canGetArguments() throws IllegalAccessException {
        Object[] expected = new Object[] { "Siema", "witam-w-devtales", "Heniu", "Ziom", new Timestamp(10), new Timestamp(10)};

        Article article = new Article();
        article.setTitle("Siema");
        article.setSlug("witam-w-devtales");
        article.setBody("Heniu");
        article.setSummary("Ziom");
        article.setCreatedOn(new Timestamp(10));
        article.setUpdatedOn(new Timestamp(10));


        Object[] actual = InsertGenerator.getArguments(article, false);

        Assert.assertArrayEquals(expected, actual);
    }
}
