package net.devtales.blog.jsengine;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import net.devtales.blog.state.StateModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

//@Component
@Slf4j
public class ReactWarmupStrategy {
    private final React react;
    private final ObjectMapper objectMapper;

    @Value("${spring.profiles.active}")
    private String profiles;

    ReactWarmupStrategy(React react, ObjectMapper objectMapper) {
        this.react = react;
        this.objectMapper = objectMapper;
    }

    public void warmup() {
        if (profiles.contains("prod")) {
            try {
                StateModel state = new StateModel(false);
                final String preState;

                preState = objectMapper.writeValueAsString(state);
                log.info("Warming up Nashorn");

                for (int i = 0; i < 1000; i++) {
                    react.render("/blog", preState);
                    react.render("/about", preState);
                    react.render("/projects", preState);
                }

                log.info("Warming up Nashorn finished");
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
