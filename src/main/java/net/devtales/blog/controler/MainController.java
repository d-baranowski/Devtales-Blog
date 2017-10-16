package net.devtales.blog.controler;

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
        model.put("content", react.render());
        model.put("isAdmin", authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> Objects.equals(a.getAuthority(), "ADMIN")));
        return "index";
    }

    @RequestMapping("/article/{slug}")
    public String index(final Map<String, Object> model, @PathVariable String slug) throws Exception {
        model.put("content", react.render());
        return "index";
    }
}
