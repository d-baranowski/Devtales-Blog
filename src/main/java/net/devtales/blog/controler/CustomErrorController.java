package net.devtales.blog.controler;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
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