package net.devtales.blog.config;

import net.devtales.blog.cache.CacheControlHandlerInterceptor;
import net.devtales.blog.config.transformer.VersionedLinksToStaticResourcesTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.ContentVersionStrategy;
import org.springframework.web.servlet.resource.CssLinkResourceTransformer;
import org.springframework.web.servlet.resource.VersionResourceResolver;

import java.util.concurrent.TimeUnit;

@Configuration
@ComponentScan("net.devtales.blog.config.transformer")
public class MvcConfigurer extends WebMvcConfigurerAdapter {

    private final ApplicationContext context;

    @Autowired
    private VersionedLinksToStaticResourcesTransformer jsVersionResourcesTransformer;

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
                .setCacheControl(
                        CacheControl.maxAge(365, TimeUnit.DAYS)
                        .cachePublic().staleIfError(365, TimeUnit.DAYS)
                        .staleWhileRevalidate(365, TimeUnit.DAYS)
                )
                .resourceChain(true)
                .addResolver(versionResourceResolver)
                .addTransformer(new CssLinkResourceTransformer())
                .addTransformer(jsVersionResourcesTransformer);

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