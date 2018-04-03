package net.devtales.blog.config.transformer;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.resource.ResourceTransformerChain;
import org.springframework.web.servlet.resource.ResourceTransformerSupport;
import org.springframework.web.servlet.resource.TransformedResource;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Map;

import static net.devtales.blog.util.StringReplaceAll.replaceAll;

@Component
public class VersionedLinksToStaticResourcesTransformer extends ResourceTransformerSupport {
    private static final Charset defaultCharset = Charset.forName("UTF-8");
    private final ResourceUrlsMapResolver urlsMapResolver;

    VersionedLinksToStaticResourcesTransformer(ResourceUrlsMapResolver urlsMapResolver) {
        this.urlsMapResolver = urlsMapResolver;
    }

    @Override
    public Resource transform(HttpServletRequest request, Resource resource, ResourceTransformerChain transformerChain) throws IOException {
        resource = transformerChain.transform(request, resource);

        String filename = resource.getFilename();
        if (!"js".equals(StringUtils.getFilenameExtension(filename))) {
            return resource;
        }

        byte[] bytes = FileCopyUtils.copyToByteArray(resource.getInputStream());
        String content = new String(bytes, defaultCharset);

        Map<String, String> urlMap = urlsMapResolver.getRelativeToVersionedUrls();

        return new TransformedResource(resource, replaceAll(content, urlMap).getBytes(defaultCharset));
    }
}
