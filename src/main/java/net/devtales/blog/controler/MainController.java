package net.devtales.blog.controler;

import jdk.nashorn.api.scripting.JSObject;
import net.devtales.commons.nashorn.React;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;
import java.util.Objects;

@Controller
public class MainController {

    private final React react;

    @Autowired
    MainController() {
        this.react = new React();
    }

    @RequestMapping("/")
    public String index(final Map<String, Object> model, Authentication authentication) throws Exception {
        final boolean isAdmin = authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> Objects.equals(a.getAuthority(), "ADMIN"));
        model.put("isAdmin", isAdmin);
        JSObject renderResult = react.render(isAdmin);
        String html = String.valueOf(renderResult.getMember("html"));
        String state = String.valueOf(renderResult.getMember("state"));
        model.put("content", html);
        model.put("state", state);
        return "index";
    }
}
