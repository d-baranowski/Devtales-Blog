package net.devtales.blog.controler.errors;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.AbstractHandlerExceptionResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Profile("prod")
@Component
@Slf4j
public class RestResponseStatusExceptionResolver extends AbstractHandlerExceptionResolver {
    private final String notificationScriptPath;

    public RestResponseStatusExceptionResolver(@Value("${net.devtales.blog.notify.email}") final String notificationScriptPath) {
        log.info("Production email notification exception resolver is mounted in the context.");
        log.info("Setting notify email path to " + notificationScriptPath);
        this.notificationScriptPath = notificationScriptPath;
    }

    @Override
    protected ModelAndView doResolveException
            (HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        logger.info("Production email notifier is attempting to notify admin about exception.",ex);
        ProcessBuilder processBuilder = new ProcessBuilder(this.notificationScriptPath);
        try {
            logger.info("Process to notify admin about to start.");
            Process process = processBuilder.start();
            logger.info("Output from process: \n" + getOutputFromProcess(process));
        } catch (IOException e) {
            logger.info("Failed to notify user about exception via email.", e);
        }

        return null;
    }

    private String getOutputFromProcess(Process process) throws IOException {
        BufferedReader reader =
                new BufferedReader(new InputStreamReader(process.getInputStream()));
        StringBuilder builder = new StringBuilder();
        String line;
        while ( (line = reader.readLine()) != null) {
            builder.append(line);
            builder.append(System.getProperty("line.separator"));
        }
        return builder.toString();
    }
}