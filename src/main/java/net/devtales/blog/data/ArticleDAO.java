package net.devtales.blog.data;

import net.devtales.blog.data.exceptions.DataManipulationFailedException;
import net.devtales.blog.data.interfaces.Crud;
import net.devtales.blog.data.model.Article;
import net.devtales.blog.data.util.ReflectionsRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

import static net.devtales.blog.extensions.LoggersBasket.error;
import static net.devtales.blog.unit.generator.InsertGenerator.generateInsertQuery;
import static net.devtales.blog.unit.generator.InsertGenerator.getArguments;

@Repository
public class ArticleDAO  implements Crud<Article> {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public Article read(int id) {
        StringBuilder query = new StringBuilder();
        query.append("SELECT ");
        query.append(Article.EMPTY.getColumnNames("a"));
        query.append(Article.EMPTY.getQueryConditions("_id"));

        Article result = jdbcTemplate.queryForObject(query.toString(), new ReflectionsRowMapper<Article>(), id);
        //TODO Figure out link table queries.
        return result;
    }

    @Override
    public void create(@RequestBody @Valid Article obj) throws DataManipulationFailedException {
        try {
            jdbcTemplate.update(generateInsertQuery(Article.class), getArguments(obj, false));
        } catch (IllegalAccessException e) {
            error(this.getClass(),e,
                    "Failed to create Article %s due to issue with reflections.",
                    obj.toString());
        }

        throw new DataManipulationFailedException("Creating the Article failed.");
    }

    @Override
    public void delete(int id) {

    }

    @Override
    public void update(Article obj) {

    }
}
