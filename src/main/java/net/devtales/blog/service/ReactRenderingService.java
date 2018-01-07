package net.devtales.blog.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jdk.nashorn.api.scripting.JSObject;
import net.devtales.blog.jsengine.CachedReact;
import net.devtales.blog.state.StateModel;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Objects;

@Component
public class ReactRenderingService {
    private final CachedReact react;
    private final ObjectMapper objectMapper;

    public ReactRenderingService(CachedReact react, ObjectMapper objectMapper) {
        this.react = react;
        this.objectMapper = objectMapper;
    }

    public String serverSideReact(final Map<String, Object> model, boolean isAdmin, String uri, String preState) {
        JSObject renderResult = react.render(uri, preState);
        if (renderResult != null) {
            String html = String.valueOf(renderResult.getMember("html"));
            String state = String.valueOf(renderResult.getMember("state"));
            model.put("content", html);
            model.put("state", state);
        } else {
            model.put("content", "");
            model.put("state", "");
        }
        model.put("isAdmin", isAdmin);
        return "index";
    }

    public String serverSideReact(final Map<String, Object> model, boolean isAdmin, String uri) {
        final StateModel stateObject = new StateModel(isAdmin);

        try {
            final String preState = objectMapper.writeValueAsString(stateObject);
            return serverSideReact(model, isAdmin, uri, preState);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
