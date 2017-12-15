package net.devtales.blog.cache;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;

@Component
public class FrontEndBundleTagilator implements DeepETagilator {
    @Override
    public String tagilate(HttpServletRequest request, HttpServletResponse response, Object handler) {
        try {
            File file = new ClassPathResource("static/js/bundle.js").getFile();
            return new Timestamp(file.lastModified()).toString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
