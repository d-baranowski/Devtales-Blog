package net.devtales.blog.data.util;

import net.devtales.blog.data.annotation.Column;
import net.devtales.blog.data.model.Article;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConversionException;
import org.springframework.jdbc.core.RowMapper;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.sql.ResultSet;
import java.sql.SQLException;

import static net.devtales.blog.extensions.LoggersBasket.trace;

public class ReflectionsRowMapper<T> implements RowMapper<T> {
    private final Class<T> model;
    public ReflectionsRowMapper(Class<T> model) {
        this.model = model;
    }

    @Override
    public T mapRow(ResultSet rs, int rowNum) throws SQLException {
        T result = null;
        try {
            result = model.getConstructor().newInstance();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }

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
                } catch (ConversionException e) {
                    trace(ReflectionsRowMapper.class, e, "Failed to convert value. Often caused by null properties");
                }
            }
        }
        return result;
    }
}
