package net.devtales.blog.controler;

import net.devtales.blog.repository.UserRepository;
import net.devtales.commons.nashorn.React;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;

@Controller
public class MainController {

    private final React react;

    @Autowired
    MainController() {
        this.react = new React();
    }

    @RequestMapping("/")
    public String index(final Map<String, Object> model) throws Exception {
        model.put("content", react.render());
        return "index";
    }

    @RequestMapping("/article/{slug}")
    public String index(final Map<String, Object> model, @PathVariable String slug) throws Exception {
        model.put("content", react.render());
        return "index";
    }
}
