package net.devtales.blog.cache;

import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class FrontEndBundleTagilator implements DeepETagilator {
    @Override
    public String tagilate(HttpServletRequest request, HttpServletResponse response, Object handler) {
        /*File file = new ClassPathResource("static/js/bundle.js").getFile();
        return new Timestamp(file.lastModified()).toString(); THIS WILL FAIL IF FILE IS NOT ON THE FILE SYSTEM*/
        return "0.0.6"; //TODO Generate bundle hash when building the app and read it from resources just like file
        //list
    }
}
