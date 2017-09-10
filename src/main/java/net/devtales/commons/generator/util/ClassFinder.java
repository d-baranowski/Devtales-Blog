package net.devtales.commons.generator.util;

import net.devtales.blog.data.model.BaseDataModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ClassFinder<T> {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());


    public List<Class<T>> find(String packageName) {
        // Prepare.
        //String packageName = "net.devtales.blog.data.model";
        List<Class<T>> models = new ArrayList<>();
        URL root = Thread.currentThread().getContextClassLoader().getResource(packageName.replace(".", "/"));

        // Filter .class files.
        if (root == null) {
            logger.error(String.format("Failed to find classes in package with name %s. Root was null", packageName));
            return Collections.emptyList();
        }
        File[] files = new File(root.getFile()).listFiles((dir, name) -> name.endsWith(".class"));

        if (files == null)
        {
            logger.error(String.format("Failed to find classes in package with name %s. Files was null", packageName));
            return Collections.emptyList();
        }
        try {
            // Find classes implementing ICommand.
            for (File file : files) {
                String className = file.getName().replaceAll(".class$", "");
                Class<?> cls = Class.forName(packageName + "." + className);
                if (BaseDataModel.class.isAssignableFrom(cls)) {
                    models.add((Class<T>) cls);
                }
            }
        } catch (ClassNotFoundException e) {
            logger.error(String.format("Failed to find classes in package with name %s. Class was not found", packageName), e);
            return Collections.emptyList();
        }

        return models;
    }
}
