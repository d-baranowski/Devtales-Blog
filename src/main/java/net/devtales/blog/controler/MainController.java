package net.devtales.blog.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

    @Autowired
    MainController() {

    }

    @RequestMapping("/*")
    public String index() throws Exception {
        return "index";
    }
}
