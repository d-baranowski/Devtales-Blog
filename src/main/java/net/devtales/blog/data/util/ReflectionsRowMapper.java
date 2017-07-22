package net.devtales.blog.data.util;

import net.devtales.blog.data.annotation.Column;
import net.devtales.blog.data.model.Article;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.jdbc.core.RowMapper;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ReflectionsRowMapper<T> implements RowMapper<T> {
    @Override
    public T mapRow(ResultSet rs, int rowNum) throws SQLException {
        T result = (T) new Object();

        for (Field field : Article.class.getDeclaredFields()) {
            if (field.isAnnotationPresent(Column.class)) {
                try {
                    BeanUtils.setProperty(result,
                            field.getName(),
                            field.getType().cast(rs.getObject(
                                    field.getDeclaredAnnotation(Column.class).name()
                            )));
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }
}
