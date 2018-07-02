package net.devtales.blog.api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Configuration
public class DefaultBeansConfiguration {
    @Bean
    ExecutorService executorService(@Value("${executor.threadcount}") final int threadCount) {
        return Executors.newFixedThreadPool(threadCount);
    }
}
