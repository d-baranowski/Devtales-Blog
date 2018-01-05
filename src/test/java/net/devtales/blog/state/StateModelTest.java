package net.devtales.blog.state;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONException;
import org.junit.Test;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.core.io.ClassPathResource;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.stream.Collectors;


public class StateModelTest {

    @Test
    public void stateModelLooksAsExpectedAfterParsing() throws IOException, JSONException {
        final ObjectMapper objectMapper = new ObjectMapper();
        final StateModel stateObject = new StateModel(false);
        final String preState = objectMapper.writeValueAsString(stateObject);
        String expectedState = new BufferedReader(new InputStreamReader(new ClassPathResource("/fixtures/expectedInitialState.json").getInputStream()))
                .lines().collect(Collectors.joining("\n"));
        JSONAssert.assertEquals(expectedState, preState, true);
    }

}
