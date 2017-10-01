package net.devtales.blog.data;

import net.devtales.blog.data.model.Article;
import net.devtales.blog.data.model.Tag;
import net.devtales.commons.data.BaseDAO;
import net.devtales.commons.data.interfaces.Crud;
import net.devtales.commons.data.interfaces.Link;
import net.devtales.commons.data.util.ReflectionsRowMapper;
import net.devtales.commons.generator.SelectGenerator;
import org.springframework.stereotype.Repository;

import java.util.List;

import static net.devtales.commons.generator.SelectGenerator.getColumnNames;

@Repository
public class ArticleDAO extends BaseDAO<Article> implements Crud<Article>, Link<Article, Tag> {
    private final SelectGenerator<Article> select = new SelectGenerator<>(Article.class);

    @Override
    public Article read(int id) {
        StringBuilder query = new StringBuilder();
        query.append("SELECT ");
        query.append(getColumnNames(Article.class, "a"));
        //query.append(getQueryConditions(Article.class, "_id"));

        Article result = getJdbcTemplate().queryForObject(query.toString(), new ReflectionsRowMapper<>(Article.class), id);
        //TODO Figure out link table queries.
        return result;
    }

    @Override
    public List<Article> readAll() {
        return getJdbcTemplate().query(select.selectQuery(), new ReflectionsRowMapper<>(Article.class));
    }

    /*@Override
    public Integer create(Article obj) throws DataManipulationFailedException {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(
                connection -> generateInsertPreparedStatement(connection,obj,this.getClass()),
                keyHolder);

        return keyHolder.getKey().intValue();
    }*/

    @Override
    public void delete(int id) {

    }

    @Override
    public void update(Article obj) {

    }

    @Override
    public Class<Article> getModel() {
        return Article.class;
    }
}
