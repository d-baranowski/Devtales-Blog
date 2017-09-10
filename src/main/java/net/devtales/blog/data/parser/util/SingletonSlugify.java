package net.devtales.blog.data.parser.util;

import com.github.slugify.Slugify;

public class SingletonSlugify {
    private static Slugify instance;

    public static Slugify getInstance() {
        if (instance == null) {
            instance = new Slugify();
        }
        return instance;
    }
}
