package net.devtales.blog.api.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.servlet.http.HttpServletResponse;


@Controller
public class CustomErrorController implements ErrorController {

    private static final String PATH = "/error";

    @RequestMapping(value = PATH)
    String error(HttpServletResponse response) {
        return response.getStatus() == 404 ? "not-found" : "error";
    }

    @Override
    public String getErrorPath() {
        return PATH;
    }
}