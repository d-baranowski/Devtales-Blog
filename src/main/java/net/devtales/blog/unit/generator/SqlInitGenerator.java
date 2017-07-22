package net.devtales.blog.unit.generator;

import net.devtales.blog.unit.generator.util.ClassFinder;
import net.devtales.blog.data.model.BaseDataModel;

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

public class SqlInitGenerator {
    public static void main(String [] args) throws ClassNotFoundException, FileNotFoundException, UnsupportedEncodingException {
        CreateTablesGenerator generator = new CreateTablesGenerator(new ClassFinder<BaseDataModel>());

        PrintWriter writer = new PrintWriter("I:\\IdeaProjects\\Devtales-Blog\\database\\init.sql", "UTF-8");
        writer.print(generator.generateBaseTablesSQL());
        writer.print(generator.generateAllLinkTables());
        writer.close();
    }
}
