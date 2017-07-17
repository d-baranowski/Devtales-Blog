package net.devtales.blog.data.model;

import lombok.Getter;
import lombok.Setter;
import net.devtales.blog.data.annotation.CollumnName;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Field;
import java.util.Arrays;

public class BaseDataModel {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @CollumnName("_id") @Getter @Setter
    int id;

    public String getColumnNames()
    {
        return getColumnNames(null);
    }

    public String getColumnNames(String prefix) {
        StringBuilder result = new StringBuilder();

        Field[] fields = this.getClass().getFields();
        for (int i = 0; i < fields.length; i++)
        {
            if (fields[i].isAnnotationPresent(CollumnName.class))
            {
                if (prefix != null)
                {
                    result.append(prefix);
                    result.append(".");
                }
                result.append(fields[i].getAnnotation(CollumnName.class).value());
                if (i == fields.length - 1)
                {
                    result.append(", ");
                }
                else
                {
                    result.append(" ");
                }
            }
        }

        return result.toString();
    }

    public String getQueryConditions(String... fieldNames) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < fieldNames.length ; i++) {
            String fieldName = fieldNames[i];
            try {
                Field field = this.getClass().getField(fieldName);

                if (field.isAnnotationPresent(CollumnName.class)) {
                    result.append(field.getAnnotation(CollumnName.class).value());
                    result.append(" = ?");
                    if (i == fieldNames.length - 1 && fieldNames.length > 1) {
                        result.append(" AND ");
                    }
                }

            } catch (NoSuchFieldException e) {
                logger.error(String.format("Failed to build condition for query because field name: %s was wrong.", fieldName));
            }
        }

        String query = result.toString();
        if (query.length() > 0) {
            query = " WHERE " + query;
        } else {
            throw new IllegalArgumentException(String.format("Given following field names %s its impossible to create query.", Arrays.toString(fieldNames)));
        }

        return query;
    }
}
