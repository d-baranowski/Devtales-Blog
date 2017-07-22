package net.devtales.blog.extensions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;


public class LoggersBasket {
    private final Map<Class, Logger> basket;
    private static LoggersBasket instance;


    private LoggersBasket() {
        this.basket = new HashMap<>();
    }

    public static void error(Class in, Exception e, String template, String... args) {
        log(in);
        instance.basket.get(in).error(String.format(template, args), e);
    }

    public static void debug(Class in, Exception e, String template, String... args) {
        log(in);
        instance.basket.get(in).debug(String.format(template, args));
    }

    public static void trace(Class in,  Exception e, String template, String... args) {
        log(in);
        instance.basket.get(in).trace(String.format(template, args));
    }

    public static void info(Class in,  Exception e, String template, String... args) {
        log(in);
        instance.basket.get(in).info(String.format(template, args));
    }

    public static void warn(Class in,  Exception e, String template, String... args) {
        log(in);
        instance.basket.get(in).warn(String.format(template, args));
    }

    private static void log(Class in) {
        if (instance == null) {
            instance = new LoggersBasket();
        }

        if (!instance.basket.containsKey(in)){
            instance.basket.put(in, LoggerFactory.getLogger(in));
        }
    }
}
