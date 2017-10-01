package net.devtales.blog.unit.blog.data.model;

import net.devtales.blog.data.model.Tag;
import net.devtales.commons.data.exceptions.MappingException;
import net.devtales.commons.data.util.ReflectionsRowMapper;
import net.devtales.commons.generator.InsertGenerator;
import org.junit.Assert;
import org.junit.Test;

import java.sql.ResultSet;
import java.sql.SQLException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class TagTest {
    @Test
    public void canGenerateSqlFortagTable() {
        String actual = InsertGenerator.generateInsertQuery(Tag.class);
        String expected = "INSERT INTO T_Tag(val) VALUES (?);";

        Assert.assertEquals(expected, actual);
    }

    @Test
    public void canGetArguments() throws IllegalAccessException {
        Object[] expected = new Object[] { "#super"};

        Tag tag = new Tag();
        tag.setValue("#super");

        Object[] actual = InsertGenerator.getArguments(tag, false);

        Assert.assertArrayEquals(expected, actual);
    }

    @Test
    public void canGetArgumentsWithId() throws IllegalAccessException {
        Object[] expected = new Object[] { 1, "#super"};

        Tag tag = new Tag();
        tag.setValue("#super");
        tag.setId(1);

        Object[] actual = InsertGenerator.getArguments(tag, true);

        Assert.assertArrayEquals(expected, actual);
    }

    @Test
    public void canMapTagUsingReflectionsRowMapper() throws SQLException {
        ReflectionsRowMapper<Tag> mapper = new ReflectionsRowMapper<>(Tag.class);
        ResultSet sample = mock(ResultSet.class);

        when(sample.getObject("_id")).thenReturn(1);
        when(sample.getObject("val")).thenReturn("#super");

        Tag actual = mapper.mapRow(sample, 0);

        assertThat(actual.getId()).isEqualTo(1);
        assertThat(actual.getValue()).isEqualTo("#super");
    }

    @Test
    public void canMapTagUsingReflectionsRowMapperWhenFieldsAreMissing() throws SQLException {
        ReflectionsRowMapper<Tag> mapper = new ReflectionsRowMapper<>(Tag.class);
        ResultSet sample = mock(ResultSet.class);

        when(sample.getObject("_id")).thenReturn(1);

        Tag actual = mapper.mapRow(sample, 0);

        assertThat(actual.getId()).isEqualTo(1);
    }

    @Test(expected = MappingException.class)
    public void canMapTagUsingReflectionsRowMapperWhenResultSetIsNull() throws SQLException {
        ReflectionsRowMapper<Tag> mapper = new ReflectionsRowMapper<>(Tag.class);
        mapper.mapRow(null, 0);
    }
}
