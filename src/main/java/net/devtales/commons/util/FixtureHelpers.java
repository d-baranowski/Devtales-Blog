package net.devtales.commons.util;

import org.springframework.core.io.ClassPathResource;

import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

public class FixtureHelpers {
    private static FixtureHelpers instance;


    public static String fixture(String path) throws IOException {
        if (instance == null) {
            instance = new FixtureHelpers();
        }

        InputStream stream = new ClassPathResource(path).getInputStream();

        StringBuilder textBuilder = new StringBuilder();
        try (Reader reader = new BufferedReader(new InputStreamReader
                (stream, Charset.forName(StandardCharsets.UTF_8.name())))) {
            int c;
            while ((c = reader.read()) != -1) {
                textBuilder.append((char) c);
            }
        }

        return textBuilder.toString();
    }

}