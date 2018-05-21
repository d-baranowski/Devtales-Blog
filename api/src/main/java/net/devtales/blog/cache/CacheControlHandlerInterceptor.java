package net.devtales.blog.cache;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.TimeZone;


public class CacheControlHandlerInterceptor extends HandlerInterceptorAdapter implements HandlerInterceptor {

    private static final String HEADER_EXPIRES = "Expires";
    private static final String HEADER_CACHE_CONTROL = "Cache-Control";

    private boolean useExpiresHeader = true;


    public CacheControlHandlerInterceptor() {
        super();
    }

    private void assignCacheControlHeader(
            final HttpServletRequest request,
            final HttpServletResponse response,
            final Object handler) {

        final CacheControl cacheControl = this.getCacheControl(request, response, handler);
        final String cacheControlHeader = this.createCacheControlHeader(cacheControl);

        if (cacheControlHeader != null) {
            response.setHeader(HEADER_CACHE_CONTROL, cacheControlHeader);
            if (useExpiresHeader) {
                response.setDateHeader(HEADER_EXPIRES, createExpiresHeader(cacheControl));
            }
        }
    }

    private String createCacheControlHeader(final CacheControl cacheControl) {

        final StringBuilder builder = new StringBuilder();

        if (cacheControl == null) {
            return null;
        }

        final CachePolicy[] policies = cacheControl.policy();

        if (cacheControl.maxAge() >= 0) {
            builder.append("max-age=").append(cacheControl.maxAge());
        }

        if (cacheControl.sharedMaxAge() >= 0) {
            if (builder.length() > 0) {
                builder.append(", ");
            }
            builder.append("s-maxage=").append(cacheControl.sharedMaxAge());
        }

        if (cacheControl.staleWhileRevalidate() >= 0) {
            if (builder.length() > 0) {
                builder.append(", ");
            }
            builder.append("stale-while-revalidate=").append(cacheControl.staleWhileRevalidate());
        }

        if (cacheControl.staleIfError() >= 0) {
            if (builder.length() > 0) {
                builder.append(", ");
            }
            builder.append("stale-if-error=").append(cacheControl.staleIfError());
        }

        for (final CachePolicy policy : policies) {
            if (builder.length() > 0) {
                builder.append(", ");
            }
            builder.append(policy.policy());
        }

        return (builder.length() > 0 ? builder.toString() : null);
    }

    private long createExpiresHeader(final CacheControl cacheControl) {

        final Calendar expires = new GregorianCalendar(TimeZone.getTimeZone("GMT"));

        if (cacheControl.maxAge() >= 0) {
            expires.add(Calendar.SECOND, cacheControl.maxAge());
        }

        return expires.getTime().getTime();
    }

    private CacheControl getCacheControl(
            final HttpServletRequest request,
            final HttpServletResponse response,
            final Object handler) {

        if (handler == null || !(handler instanceof HandlerMethod)) {
            return null;
        }

        final HandlerMethod handlerMethod = (HandlerMethod) handler;
        CacheControl cacheControl = handlerMethod.getMethodAnnotation(CacheControl.class);

        if (cacheControl == null) {
            return handlerMethod.getBeanType().getAnnotation(CacheControl.class);
        }

        return cacheControl;
    }

    @Override
    public final boolean preHandle(
            final HttpServletRequest request,
            final HttpServletResponse response,
            final Object handler) throws Exception {

        this.assignCacheControlHeader(request, response, handler);

        return super.preHandle(request, response, handler);
    }

    public final void setUseExpiresHeader(final boolean useExpiresHeader) {
        this.useExpiresHeader = useExpiresHeader;
    }

}
