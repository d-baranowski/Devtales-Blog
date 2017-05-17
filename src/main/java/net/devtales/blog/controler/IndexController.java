package net.devtales.blog.controler;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Daniel on 17/05/2017.
 */
@Controller
public class IndexController {

    @RequestMapping("/")
    public ResponseEntity<String> index() {
        return ResponseEntity.ok("Hello World");
    }
}
