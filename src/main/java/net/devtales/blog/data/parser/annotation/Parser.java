package net.devtales.blog.data.parser.annotation;


import java.lang.annotation.*;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Parser {
    Class input();

    Class output();
}
