package net.devtales.blog.unit.generator;

import net.devtales.blog.data.model.Article;
import net.devtales.commons.generator.InsertGenerator;
import org.junit.Assert;
import org.junit.Test;

import java.sql.Timestamp;

public class InsertGeneratorTest {

    @Test
    public void canGenerateSqlForArticleTable() {
        String actual = InsertGenerator.generateInsertQuery(Article.class);
        String expected = "INSERT INTO T_Article(title, slug, html, summary, createdOn, updatedOn, jsonRepresentation) VALUES (?, ?, ?, ?, ?, ?, ?);";

        Assert.assertEquals(expected, actual);
    }

    @Test
    public void canGenerateLinkQuery() throws NoSuchFieldException, ClassNotFoundException {
        String expected = "INSERT INTO T_Article_Tags(T_Article_Id, T_Tag_Id) VALUES (?,?)";
        String actual = InsertGenerator.generateLinkQuery(Article.class, Article.class.getDeclaredField("tags")).get();

        Assert.assertEquals(expected, actual);
    }

    @Test
    public void canGetArguments() throws IllegalAccessException {
        Object[] expected = new Object[] { "Siema", "witam-w-devtales", "Heniu", "Ziom", new Timestamp(10), new Timestamp(10), "gonwo"};

        Article article = new Article();
        article.setTitle("Siema");
        article.setSlug("witam-w-devtales");
        article.setHtml("Heniu");
        article.setSummary("Ziom");
        article.setJsonRepresentation("gonwo");
        article.setCreatedOn(new Timestamp(10));
        article.setUpdatedOn(new Timestamp(10));


        Object[] actual = InsertGenerator.getArguments(article, false);

        Assert.assertArrayEquals(expected, actual);
    }
}
