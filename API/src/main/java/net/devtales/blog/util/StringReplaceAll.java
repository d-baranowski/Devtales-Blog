package net.devtales.blog.util;

import java.util.Map;

public class StringReplaceAll {

    private StringReplaceAll() {};

    public static String replaceAll(String input, Map<String, String> replacements) {
        String output = input;
        for (String key: replacements.keySet()) {
            output = output.replaceAll(key, replacements.get(key));
        }
        return output;
    }
}
