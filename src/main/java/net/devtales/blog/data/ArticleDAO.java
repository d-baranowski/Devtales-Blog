package net.devtales.blog.data;

import net.devtales.blog.data.model.Article;
import net.devtales.commons.data.exceptions.DataManipulationFailedException;
import net.devtales.commons.data.interfaces.Crud;
import net.devtales.commons.data.util.ReflectionsRowMapper;
import net.devtales.commons.generator.SelectGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import static net.devtales.blog.extensions.LoggersBasket.error;
import static net.devtales.commons.generator.InsertGenerator.generateInsertQuery;
import static net.devtales.commons.generator.InsertGenerator.getArguments;
import static net.devtales.commons.generator.SelectGenerator.getColumnNames;

@Repository
public class ArticleDAO implements Crud<Article> {
    @Autowired
    JdbcTemplate jdbcTemplate;

    private final SelectGenerator<Article> select = new SelectGenerator<>(Article.class);

    @Override
    public Article read(int id) {
        StringBuilder query = new StringBuilder();
        query.append("SELECT ");
        query.append(getColumnNames(Article.class, "a"));
        //query.append(getQueryConditions(Article.class, "_id"));

        Article result = jdbcTemplate.queryForObject(query.toString(), new ReflectionsRowMapper<>(Article.class), id);
        //TODO Figure out link table queries.
        return result;
    }

    @Override
    public List<Article> readAll() {
        return jdbcTemplate.query(select.selectQuery(), new ReflectionsRowMapper<>(Article.class));
    }

    @Override
    public Integer create(Article obj) throws DataManipulationFailedException {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(
                connection -> {
                    PreparedStatement ps =
                            connection.prepareStatement(generateInsertQuery(Article.class), new String[] {"_id"});

                    try {
                        Object[] arguments = getArguments(obj, false);
                        for (int i = 0; i < arguments.length; i++) {
                            ps.setObject(i + 1, arguments[i]);
                        }

                        return ps;
                    } catch (IllegalAccessException e) {
                        error(this.getClass(),e,
                                "Failed to create Article %s due to issue with reflections.",
                                obj.toString());
                    }
                    return null;
                }, keyHolder);

        return keyHolder.getKey().intValue();
    }

    @Override
    public void delete(int id) {

    }

    @Override
    public void update(Article obj) {

    }
}
