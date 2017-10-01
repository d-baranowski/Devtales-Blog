package net.devtales.commons.data.util;

import net.devtales.commons.data.annotation.Column;
import net.devtales.commons.data.exceptions.MappingException;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConversionException;
import org.springframework.jdbc.core.RowMapper;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ReflectionsRowMapper<T> implements RowMapper<T> {
    private final Class<T> model;
    public ReflectionsRowMapper(Class<T> model) {
        this.model = model;
    }

    @Override
    public T mapRow(ResultSet rs, int rowNum) {
        T result = null;

        if (rs == null) {
            throw new MappingException("Result Set is null or empty");
        }

        try {
            result = model.getConstructor().newInstance();
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
            throw new MappingException("Failed to instantiate model of type %s to map.");
        }

        List<Field> fields = new ArrayList<>();
        fields.addAll(Arrays.asList(result.getClass().getDeclaredFields()));

        //Add all parent classes fields
        Class superClass = result.getClass().getSuperclass();
        while (superClass != Object.class) {
            fields.addAll(Arrays.asList(superClass.getDeclaredFields()));
            superClass = superClass.getSuperclass();
        }

        for (Field field : fields) {
            if (field.isAnnotationPresent(Column.class)) {
                try {
                    Object resultSetObject = rs.getObject(
                            field.getDeclaredAnnotation(Column.class).name()
                    );
                    BeanUtils.setProperty(result,
                            field.getName(),
                            field.getType().cast(resultSetObject));
                } catch (IllegalAccessException | InvocationTargetException | ConversionException | SQLException e) {
                    throw new MappingException("Failed to map field %s due to exception \n %s", field.getName(), e.toString());
                }
            }
        }
        return result;
    }
}
