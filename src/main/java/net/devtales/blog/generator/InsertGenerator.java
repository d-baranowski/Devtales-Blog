package net.devtales.blog.generator;

import net.devtales.blog.data.annotation.Column;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import static net.devtales.blog.generator.util.Utilities.getColumnFields;
import static net.devtales.blog.generator.util.Utilities.getColumns;
import static net.devtales.blog.generator.util.Utilities.getTableName;

public abstract class InsertGenerator {
    public static String generateInsertQuery(Class model) {
        StringBuilder result = new StringBuilder();

        result.append("INSERT INTO ")
                .append(getTableName(model))
                .append("(");

        List<Column> collInfo = getColumns(model, false);

        for (int i = 0; i < collInfo.size(); i++) {
            result.append(collInfo.get(i).name());
            if (i != collInfo.size() - 1) {
                result.append(", ");
            } else {
                result.append(") VALUES ");
            }
        }

        result.append("(");
        for (int i = 0; i < collInfo.size(); i++) {
            result.append("?");
            if (i != collInfo.size() - 1) {
                result.append(", ");
            }
        }
        result.append(");");

        return result.toString();
    }

    public static Object[] getArguments(Object model, boolean includePrimaryKey) throws IllegalAccessException {
        List<Field> fields = getColumnFields(model.getClass(), includePrimaryKey);
        List<Object> values = new ArrayList<>();

        for (Field field : fields) {
            field.setAccessible(true);
            values.add(field.get(model));
            field.setAccessible(false);
        }

        return values.toArray();
    }
}
