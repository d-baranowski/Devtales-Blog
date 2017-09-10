package net.devtales.commons.generator;

import net.devtales.commons.data.annotation.Column;

import java.lang.reflect.Field;
import java.util.List;

import static net.devtales.commons.generator.util.Utilities.getColumnFields;
import static net.devtales.commons.generator.util.Utilities.getTableName;

public class SelectGenerator<T> {
    private final Class<T> model;
    public SelectGenerator(Class<T> model) {
        this.model = model;
    }

    public String selectQuery() {
        return selectQuery(null);
    }

    public String selectQuery(String where) {
        StringBuilder result = new StringBuilder();

        result.append("SELECT ");
        result.append(getColumnNames(model));
        result.append("FROM ");
        result.append(getTableName(model));
        if (where != null && !where.isEmpty()) {
            result.append(" WHERE ");
            result.append(where);
        }
        result.append(";");

        return result.toString();
    }

    public static String getColumnNames(Class model)
    {
        return getColumnNames(model,null);
    }

    public static String getColumnNames(Class model, String prefix) {
        StringBuilder result = new StringBuilder();

        List<Field> fields = getColumnFields(model, true);
        for (int i = 0; i < fields.size(); i++)
        {
            if (prefix != null)
            {
                result.append(prefix);
                result.append(".");
            }
            result.append(fields.get(i).getAnnotation(Column.class).name());
            if (i != fields.size() - 1)
            {
                result.append(", ");
            }
            else
            {
                result.append(" ");
            }
        }

        return result.toString();
    }
}
