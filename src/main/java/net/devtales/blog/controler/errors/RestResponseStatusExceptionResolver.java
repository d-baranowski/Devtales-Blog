package net.devtales.blog.controler.errors;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.AbstractHandlerExceptionResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Profile("prod")
@Component
@Slf4j
public class RestResponseStatusExceptionResolver extends AbstractHandlerExceptionResolver {
    private final String notificationScriptPath;

    public RestResponseStatusExceptionResolver(@Value("${net.devtales.blog.notify.email}") final String notificationScriptPath) {
        this.notificationScriptPath = notificationScriptPath;
    }

    @Override
    protected ModelAndView doResolveException
            (HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        logger.error(ex);
        ProcessBuilder processBuilder = new ProcessBuilder(this.notificationScriptPath);
        try {
            processBuilder.start();
        } catch (IOException e) {
            logger.error("Failed to notify user about exception via email.", e);
        }

        return null;
    }
}