package net.devtales.blog.data;

import net.devtales.blog.data.exceptions.DataManipulationFailedException;
import net.devtales.blog.data.interfaces.Crud;
import net.devtales.blog.data.model.Article;
import net.devtales.blog.data.util.ReflectionsRowMapper;
import net.devtales.blog.generator.SelectGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.List;

import static net.devtales.blog.extensions.LoggersBasket.error;
import static net.devtales.blog.generator.InsertGenerator.generateInsertQuery;
import static net.devtales.blog.generator.InsertGenerator.getArguments;
import static net.devtales.blog.generator.SelectGenerator.getColumnNames;
import static net.devtales.blog.extensions.Slugify.slugs;

@Repository
public class ArticleDAO  implements Crud<Article> {
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
    public void create(@RequestBody @Valid Article obj) throws DataManipulationFailedException {
        try {
            obj.setCreatedOn(new Timestamp(System.currentTimeMillis()));
            obj.setSlug(slugs(obj.getTitle()));
            jdbcTemplate.update(generateInsertQuery(Article.class), getArguments(obj, false));
        } catch (IllegalAccessException e) {
            error(this.getClass(),e,
                    "Failed to create Article %s due to issue with reflections.",
                    obj.toString());
            throw new DataManipulationFailedException("Creating the Article failed.");
        }
    }

    @Override
    public void delete(int id) {

    }

    @Override
    public void update(Article obj) {

    }
}
