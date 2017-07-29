package net.devtales.blog.controler;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AdminController {
    @RequestMapping(path = "/admin", method = RequestMethod.GET)
    public String admin() {
        return "admin";
    }
}
