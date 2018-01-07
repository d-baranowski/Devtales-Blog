package net.devtales.blog.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

//CHECKSTYLE:OFF
@Configuration
public class DefaultBeansConfiguration {
    @Bean
    ExecutorService executorService(@Value("${executor.threadcount}") final int threadCount) {
        return Executors.newFixedThreadPool(threadCount);
    }
}
