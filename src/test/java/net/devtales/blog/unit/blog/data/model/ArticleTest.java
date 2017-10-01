package net.devtales.blog.unit.blog.data.model;


import net.devtales.blog.data.model.Article;
import net.devtales.commons.data.exceptions.MappingException;
import net.devtales.commons.data.util.ReflectionsRowMapper;
import org.junit.Test;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class ArticleTest {
    @Test
    public void canMapArticleUsingReflectionsRowMapper() throws SQLException {
        ReflectionsRowMapper<Article> mapper = new ReflectionsRowMapper<>(Article.class);
        ResultSet sample = mock(ResultSet.class);

        when(sample.getObject("_id")).thenReturn(1);
        when(sample.getObject("title")).thenReturn("Sample Title");
        when(sample.getObject("slug")).thenReturn("sample-title");
        when(sample.getObject("html")).thenReturn("This is some html");
        when(sample.getObject("summary")).thenReturn("This is some summary");
        when(sample.getObject("createdOn")).thenReturn(new Timestamp(100010));
        when(sample.getObject("updatedOn")).thenReturn(new Timestamp(100050));
        when(sample.getObject("jsonRepresentation")).thenReturn("Some beautiful json");

        Article actual = mapper.mapRow(sample, 0);

        assertThat(actual.getId()).isEqualTo(1);
        assertThat(actual.getTitle()).isEqualTo("Sample Title");
        assertThat(actual.getSlug()).isEqualTo("sample-title");
        assertThat(actual.getHtml()).isEqualTo("This is some html");
        assertThat(actual.getSummary()).isEqualTo("This is some summary");
        assertThat(actual.getCreatedOn()).isEqualTo(new Timestamp(100010));
        assertThat(actual.getUpdatedOn()).isEqualTo(new Timestamp(100050));
        assertThat(actual.getJsonRepresentation()).isEqualTo("Some beautiful json");
    }

    @Test
    public void canMapArticleUsingReflectionsRowMapperWhenFieldsAreMissing() throws SQLException {
        ReflectionsRowMapper<Article> mapper = new ReflectionsRowMapper<>(Article.class);
        ResultSet sample = mock(ResultSet.class);

        when(sample.getObject("summary")).thenReturn("This is some summary");
        when(sample.getObject("createdOn")).thenReturn(new Timestamp(100010));
        when(sample.getObject("updatedOn")).thenReturn(new Timestamp(100050));
        when(sample.getObject("jsonRepresentation")).thenReturn("Some beautiful json");

        Article actual = mapper.mapRow(sample, 0);

        assertThat(actual.getSummary()).isEqualTo("This is some summary");
        assertThat(actual.getCreatedOn()).isEqualTo(new Timestamp(100010));
        assertThat(actual.getUpdatedOn()).isEqualTo(new Timestamp(100050));
        assertThat(actual.getJsonRepresentation()).isEqualTo("Some beautiful json");
    }

    @Test(expected = MappingException.class)
    public void canMapArticleUsingReflectionsRowMapperWhenResultSetIsNull() throws SQLException {
        ReflectionsRowMapper<Article> mapper = new ReflectionsRowMapper<>(Article.class);
        mapper.mapRow(null, 0);
    }




}
