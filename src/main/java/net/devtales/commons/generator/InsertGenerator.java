package net.devtales.commons.generator;

import net.devtales.blog.data.model.Article;
import net.devtales.commons.data.annotation.Column;
import org.springframework.jdbc.support.KeyHolder;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import static net.devtales.blog.extensions.LoggersBasket.error;
import static net.devtales.commons.generator.util.Utilities.getColumnFields;
import static net.devtales.commons.generator.util.Utilities.getColumns;
import static net.devtales.commons.generator.util.Utilities.getTableName;

public abstract class InsertGenerator {

    public static PreparedStatement generateInsertPreparedStatement(Connection conn, Object obj, Class scope) throws SQLException {
        PreparedStatement ps =
                conn.prepareStatement(generateInsertQuery(obj.getClass()), new String[] {"_id"});

        try {
            Object[] arguments = getArguments(obj, false);
            for (int i = 0; i < arguments.length; i++) {
                ps.setObject(i + 1, arguments[i]);
            }

            return ps;
        } catch (IllegalAccessException e) {
            error(scope,e,
                    "Failed to create Article %s due to issue with reflections.",
                    obj.toString());
        }
        return null;
    }

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
