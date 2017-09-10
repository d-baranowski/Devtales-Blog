package net.devtales.commons.data.annotation;


import java.lang.annotation.*;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Column {
    String name();
    String type();
    boolean primary() default false;
}
