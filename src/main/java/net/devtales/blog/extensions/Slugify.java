package net.devtales.blog.extensions;

import java.io.InputStream;
import java.text.Normalizer;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.regex.Pattern;

public class Slugify {
    private static final String BUILTIN_REPLACEMENTS_FILENAME = "replacements.properties";
    private static final Properties replacements = new Properties();

    private final static String EMPTY = "";
    private final static Pattern PATTERN_NORMALIZE_NON_ASCII = Pattern.compile("[^\\p{ASCII}]+");
    private final static Pattern PATTERN_NORMALIZE_SEPARATOR = Pattern.compile("[\\W\\s+]+");
    private final static Pattern PATTERN_NORMALIZE_TRIM_DASH = Pattern.compile("^-|-$");

    private boolean lowerCase = true;
    private static Slugify instance;

    public static String slugs(final String text) {
        if (instance == null) {
            instance = new Slugify();
        }
        return instance.slugify(text);
    }

    private Slugify() {
        loadReplacements(BUILTIN_REPLACEMENTS_FILENAME);
    }

    private String slugify(final String text) {
        String input = text;
        if (isNullOrBlank(input)) {
            return EMPTY;
        }

        input = input.trim();
        input = builtInReplacements(input);
        input = normalize(input);

        if (lowerCase) {
            input = input.toLowerCase();
        }

        return input;
    }

    private String builtInReplacements(String input) {
        for (Entry<Object, Object> e : replacements.entrySet()) {
            input = input.replace(e.getKey().toString(), e.getValue().toString());
        }

        return input;
    }

    private Slugify loadReplacements(final String resourceFileName) {
        if (!replacements.isEmpty()) {
            return this;
        }

        try {
            final InputStream replacementsStream = getClass().getClassLoader().getResourceAsStream(resourceFileName);
            replacements.load(replacementsStream);
            replacementsStream.close();
            return this;
        } catch (Exception e) {
            throw new RuntimeException(String.format("Resource '%s' not loaded!", resourceFileName), e);
        }
    }

    private static boolean isNullOrBlank(final String string) {
        return string == null || string.trim().isEmpty();
    }

    private String normalize(final String input) {
        String text = Normalizer.normalize(input, Normalizer.Form.NFKD);
        text = PATTERN_NORMALIZE_NON_ASCII.matcher(text).replaceAll(EMPTY);
        text = PATTERN_NORMALIZE_SEPARATOR.matcher(text).replaceAll("-");
        text = PATTERN_NORMALIZE_TRIM_DASH.matcher(text).replaceAll(EMPTY);

        return text;
    }
}
