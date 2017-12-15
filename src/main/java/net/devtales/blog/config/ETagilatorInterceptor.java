package net.devtales.blog.config;

import net.devtales.blog.cache.DeepETagger;
import net.devtales.blog.cache.DeepETagilator;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ETagilatorInterceptor extends HandlerInterceptorAdapter implements ApplicationContextAware {

    private static final String HEADER_ETAG = "ETag";
    private static final String HEADER_IF_NONE_MATCH = "If-None-Match";

    private ApplicationContext context = null;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (request.getMethod().equals("GET") && handler != null && handler instanceof HandlerMethod) {
            DeepETagger methodAnnotation = ((HandlerMethod) handler).getMethodAnnotation(DeepETagger.class);
            if (methodAnnotation != null) {
                String requestETag = request.getHeader(HEADER_IF_NONE_MATCH);

                StringBuilder newETag = new StringBuilder();
                for (int i = 0; i < methodAnnotation.eTagger().length; i++) {
                    Class<? extends DeepETagilator> beanType = methodAnnotation.eTagger()[i];
                    DeepETagilator currentTagilator = context.getBean(beanType);
                    newETag.append(currentTagilator.tagilate(request, response, handler));
                }
                String resultTag = newETag.toString().hashCode() + "";
                if (resultTag.equals(requestETag)) {
                    response.setStatus(304); // no change
                    return false;
                }
                response.setHeader(HEADER_ETAG, resultTag);
            }
        }
        return super.preHandle(request, response, handler);
    }

    @Override
    public void setApplicationContext(ApplicationContext context) throws BeansException {
        this.context = context;
    }
}