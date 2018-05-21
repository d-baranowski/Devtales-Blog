package net.devtales.blog.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jdk.nashorn.api.scripting.JSObject;
import lombok.extern.slf4j.Slf4j;
import net.devtales.blog.jsengine.CachedReact;
import net.devtales.blog.state.StateModel;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@Slf4j
public class ReactRenderingService {
    private final CachedReact react;
    private final ObjectMapper objectMapper;

    public ReactRenderingService(CachedReact react, ObjectMapper objectMapper) {
        this.react = react;
        this.objectMapper = objectMapper;
    }

    public String serverSideReact(final Map<String, Object> model, boolean isAdmin, String uri, String preState) {
        log.info(String.format("Attempting to server side render uri: %s with admin rigths: %s", uri, isAdmin));
        JSObject renderResult = react.render(uri, preState);
        log.info("Got render result.");
        if (renderResult != null) {
            log.info("Render result was not null.");
            String html = String.valueOf(renderResult.getMember("html"));
            String state = String.valueOf(renderResult.getMember("state"));
            model.put("content", html);
            model.put("state", state);
            log.info("Render result was used to populate model.");
        } else {
            log.info("Render result was null. Returning empty content.");
            model.put("content", "");
            model.put("state", preState);
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
