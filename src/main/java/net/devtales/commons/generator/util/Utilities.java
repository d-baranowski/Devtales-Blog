package net.devtales.commons.generator.util;

import net.devtales.commons.data.annotation.Column;
import net.devtales.commons.data.annotation.TableName;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public abstract class Utilities {
    public static String getTableName(Class model) {
        String value = ((TableName) model.getAnnotation(TableName.class)).value();
        return "T_" + (value.isEmpty() ? model.getSimpleName() : value);
    }

    public static List<Column> getColumns(Class model, boolean includePrimaryKey) {
        ArrayList<Column> collInfo = new ArrayList<>();

        for (Field field : model.getSuperclass().getDeclaredFields()) {
            if (field.isAnnotationPresent(Column.class)) {
                Column annotation = field.getAnnotation(Column.class);
                if (!includePrimaryKey && annotation.primary()) {
                    continue;
                }
                collInfo.add(annotation);
            }
        }

        for (Field field : model.getDeclaredFields()) {
            if (field.isAnnotationPresent(Column.class)) {
                Column annotation = field.getAnnotation(Column.class);
                if (!includePrimaryKey && annotation.primary()) {
                    continue;
                }
                collInfo.add(annotation);
            }
        }

        return collInfo;
    }

    public static List<Field> getColumnFields(Class model, boolean includePrimaryKey) {
        ArrayList<Field> collInfo = new ArrayList<>();

        for (Field field : model.getSuperclass().getDeclaredFields()) {
            if (field.isAnnotationPresent(Column.class)) {
                Column annotation = field.getAnnotation(Column.class);
                if (!includePrimaryKey && annotation.primary()) {
                    continue;
                }
                collInfo.add(field);
            }
        }

        for (Field field : model.getDeclaredFields()) {
            if (field.isAnnotationPresent(Column.class)) {
                Column annotation = field.getAnnotation(Column.class);
                if (!includePrimaryKey && annotation.primary()) {
                    continue;
                }
                collInfo.add(field);
            }
        }

        return collInfo;
    }
}
