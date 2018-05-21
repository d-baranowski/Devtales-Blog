package net.devtales.blog.cache;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface DeepETagilator {
    public String tagilate(HttpServletRequest request, HttpServletResponse response, Object handler);
}
