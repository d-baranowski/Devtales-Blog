package net.devtales.blog.config;

import net.rossillo.spring.web.mvc.CacheControlHandlerInterceptor;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.ShallowEtagHeaderFilter;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.ContentVersionStrategy;
import org.springframework.web.servlet.resource.VersionResourceResolver;

import javax.servlet.Filter;

@Configuration
public class MvcConfigurer extends WebMvcConfigurerAdapter {

    private final ApplicationContext context;

    public MvcConfigurer(ApplicationContext context) {
        this.context = context;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Resources without Spring Security. No cache control response headers.
        VersionResourceResolver versionResourceResolver = new VersionResourceResolver()
                .addVersionStrategy(new ContentVersionStrategy(), "/**");

        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .setCachePeriod(60 * 60 * 24 * 365) /* one year */
                .resourceChain(true)
                .addResolver(versionResourceResolver);

        // Resources controlled by Spring Security, which
        // adds "Cache-Control: must-revalidate".
        registry.addResourceHandler("/blog-content/**")
                .addResourceLocations("file:blog-content/")
                .setCachePeriod(3600*24*30*360);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        ETagilatorInterceptor myEtagilator = new ETagilatorInterceptor();
        myEtagilator.setApplicationContext(context);
        registry.addInterceptor(new CacheControlHandlerInterceptor());
        registry.addInterceptor(myEtagilator);
    }
}