package net.devtales.commons.generator;

import java.util.HashMap;

public class SelectGeneratorPool
{
    private static HashMap<Class, SelectGenerator> pool = new HashMap<>();

    public static SelectGenerator getSelectGenerator(Class model) {
        if (!pool.containsKey(model)) {
            pool.put(model, new SelectGenerator<>(model));
        }

        return pool.get(model);
    }
}
