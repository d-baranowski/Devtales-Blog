package net.devtales.blog.service;

import jdk.nashorn.api.scripting.JSObject;
import net.devtales.blog.jsengine.CachedReact;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Objects;

@Component
public class ReactRenderingService {
    private final CachedReact react;

    public ReactRenderingService(CachedReact react) {
        this.react = react;
    }

    public String serverSideReact(final Map<String, Object> model, boolean isAdmin, String uri, String preState) {
        JSObject renderResult = react.render(uri, preState);
        String html = String.valueOf(renderResult.getMember("html"));
        String state = String.valueOf(renderResult.getMember("state"));
        model.put("content", html);
        model.put("state", state);
        model.put("isAdmin", isAdmin);
        return "index";
    }

    public String serverSideReact(final Map<String, Object> model, boolean isAdmin, String uri) {
        String preState = "{\"adminReducer\":{\"isAdmin\":"+isAdmin+"}}";
        return serverSideReact(model, isAdmin, uri, preState);
    }
}
