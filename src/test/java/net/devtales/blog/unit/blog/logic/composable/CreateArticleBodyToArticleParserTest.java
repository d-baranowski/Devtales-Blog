package net.devtales.blog.unit.blog.logic.composable;

import net.devtales.blog.controler.model.CreateArticleBody;
import net.devtales.blog.data.model.Article;
import net.devtales.blog.data.model.Tag;
import net.devtales.blog.data.parser.CreateArticleBodyToArticleParserAlsoCreatesTagsIfTheyDontExsistSorryFutureMe;
import org.junit.Test;
import org.mockito.internal.util.collections.Sets;

import java.io.IOException;

import static net.devtales.commons.util.FixtureHelpers.fixture;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;

public class CreateArticleBodyToArticleParserTest {
    private CreateArticleBodyToArticleParserAlsoCreatesTagsIfTheyDontExsistSorryFutureMe parser = CreateArticleBodyToArticleParserAlsoCreatesTagsIfTheyDontExsistSorryFutureMe.getInstance();
    private Article article = parser.parse(new CreateArticleBody(fixture("/fixtures/body1.html"), fixture("/fixtures/body1.json")));

    public CreateArticleBodyToArticleParserTest() throws IOException {
    }

    @Test
    public void canParseArticleTitle() throws IOException {
        assertEquals("Title is awesome", article.getTitle());
    }


    @Test
    public void canParseArticleSlug() {
        assertEquals("title-is-awesome", article.getSlug());
    }

    @Test
    public void canParseArticleTags() {
        assertThat(Sets.newSet(
                new Tag("#super"),
                new Tag("#ekstra"),
                new Tag("#proszeNieWybuchaj"))).isEqualTo(article.getTags());
    }

    @Test
    public void canCleanHtml() {
        assertThat(article.getHtml())
                .doesNotContain("data-")
                .doesNotContain("contenteditable")
                .doesNotContain("spellcheck")
                .doesNotContain("role");
    }

    @Test
    public void canParseArticleSummary() {
        assertEquals(
                "<div class=\"summary\"> \n" +
                        " <div class=\"public-DraftStyleDefault-block public-DraftStyleDefault-ltr\">\n" +
                        "  <span><span>This is a summary</span></span>\n" +
                        " </div> \n" +
                        "</div><br><div class=\"summary\"> \n" +
                        " <div class=\"public-DraftStyleDefault-block public-DraftStyleDefault-ltr\">\n" +
                        "  <span><span>This is some more summary</span></span> \n" +
                        " </div> \n" +
                        "</div><br><div class=\"summary\"> \n" +
                        " <div class=\"public-DraftStyleDefault-block public-DraftStyleDefault-ltr\"> \n" +
                        "  <span><span>I like this summary</span></span>\n" +
                        " </div> \n" +
                        "</div><br><div class=\"summary\"> \n" +
                        " <div class=\"public-DraftStyleDefault-block public-DraftStyleDefault-ltr\">\n" +
                        "  <span><span>Summary is fun</span></span>\n" +
                        " </div> \n" +
                        "</div><br>", article.getSummary());
    }
}
