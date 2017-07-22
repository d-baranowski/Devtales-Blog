package net.devtales.blog.unit.generator;

import net.devtales.blog.data.annotation.Column;
import net.devtales.blog.data.annotation.LinkTable;
import net.devtales.blog.data.annotation.TableName;
import net.devtales.blog.unit.generator.util.ClassFinder;
import net.devtales.blog.data.model.BaseDataModel;

import java.lang.reflect.Field;
import java.util.List;

import static net.devtales.blog.unit.generator.util.Utilities.getColumns;
import static net.devtales.blog.unit.generator.util.Utilities.getTableName;

public class CreateTablesGenerator {

    private final ClassFinder<BaseDataModel> modelsFinder;

    public CreateTablesGenerator(ClassFinder modelsFinder) {
        this.modelsFinder = modelsFinder;
    }

    public List<Class<BaseDataModel>> getAllModels() {
         return modelsFinder.find("net.devtales.blog.data.model");
    }

    public String generateBaseTablesSQL() {
        StringBuilder result = new StringBuilder();

        for (Class<BaseDataModel> model: getAllModels()) {
            if (model.isAnnotationPresent(TableName.class)) {
                result.append(generateCreateTable(model));
            }
        }
        return result.toString();
    }

    public String generateAllLinkTables() {
        StringBuilder result = new StringBuilder();

        for (Class<BaseDataModel> model: getAllModels()) {
            if (model.isAnnotationPresent(TableName.class)) {
                result.append(generateLinkTables(model));
            }
        }
        return result.toString();
    }

    public String generateLinkTables(Class model) {
        StringBuilder result = new StringBuilder();
        for (Field field : model.getSuperclass().getDeclaredFields()) {
            if (field.isAnnotationPresent(LinkTable.class)) {
               result.append(generateLinkTable(model, field));
            }
        }

        for (Field field : model.getDeclaredFields()) {
            if (field.isAnnotationPresent(LinkTable.class)) {
               result.append(generateLinkTable(model, field));
            }
        }

        return result.toString();
    }


    public String generateLinkTable(Class parent, Field children) {
        StringBuilder result = new StringBuilder();

        result.append("CREATE TABLE ")
        .append("T_");
        result.append(children.getAnnotation(LinkTable.class).value())
        .append(" (\n\t");

        String parentForeign = getTableName(parent) + "_Id";
        result.append(parentForeign);
        result.append(" INT(11),\n\t");

        String childForeign = getTableName(children.getType().getComponentType()) + "_Id";
        result.append(childForeign);
        result.append(" INT(11),\n\t");

        result.append("FOREIGN KEY (");
        result.append(parentForeign).append(") ");
        result.append("REFERENCES ");
        result.append(getTableName(parent));
        result.append("(_id),\n\t");

        result.append("FOREIGN KEY (");
        result.append(childForeign).append(") ");
        result.append("REFERENCES ");
        result.append(getTableName(children.getType().getComponentType()));
        result.append("(_id)\n);");

        return result.toString();
    }


    public String generateCreateTable(Class model) {
        StringBuilder sqlBuilder = new StringBuilder();

        sqlBuilder.append("CREATE TABLE ");
        sqlBuilder.append(getTableName(model));

        List<Column> collInfo = getColumns(model, true);
        sqlBuilder.append(" (\n");
        for (int i = 0; i < collInfo.size(); i++) {
            sqlBuilder.append("\t");
            sqlBuilder.append(collInfo.get(i).name());
            sqlBuilder.append(" ");
            sqlBuilder.append(collInfo.get(i).type());

            if (collInfo.get(i).primary()){
                sqlBuilder.append(",\n\tPRIMARY KEY(")
                        .append(collInfo.get(i).name())
                        .append(")");
            }

            if (i != collInfo.size() - 1) {
                sqlBuilder.append(",");
                sqlBuilder.append("\n");
            }
        }

        sqlBuilder.append("\n);\n\n");

        return sqlBuilder.toString();
    }
}
