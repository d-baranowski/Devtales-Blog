package net.devtales.blog.data;

import net.devtales.blog.data.interfaces.Crud;
import net.devtales.blog.data.model.Article;
import net.devtales.blog.data.util.ReflectionsRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ArticleDAO implements Crud<Article> {

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
    public int create(Article obj) {
        return 0;
    }

    @Override
    public int delete(int id) {
        return 0;
    }

    @Override
    public int update(Article obj) {
        return 0;
    }
}
