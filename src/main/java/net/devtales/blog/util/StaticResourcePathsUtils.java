package net.devtales.blog.util;

import org.springframework.core.io.ClassPathResource;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


public class StaticResourcePathsUtils {
    public static List<String> getStaticResourcePaths() {
        String[] initialArray = parseFileToArray(readFile());
        return Arrays.stream(initialArray)
                .map(path -> ("/" + path).replace(" ", ""))
                .collect(Collectors.toList());
    }

    private static String[] parseFileToArray(String file) {
        String temp;
        temp = file.replace("[", "");
        temp = temp.replace("]", "");
        return temp.split(",");
    }

    private static String readFile() {

        StringBuilder result = new StringBuilder("");
        ClassPathResource resource = new ClassPathResource("static-files-list.txt");

        try (InputStream inputStream = resource.getInputStream()) {

            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
            String line;

            while ((line = bufferedReader.readLine()) != null) {
                result.append(line);
            }
            inputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result.toString();
    }
}
