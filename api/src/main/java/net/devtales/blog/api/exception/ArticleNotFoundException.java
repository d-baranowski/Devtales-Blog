package net.devtales.blog.api.exception;

public class ArticleNotFoundException extends RuntimeException {
    public ArticleNotFoundException(Long id) {
        super("Article with id " + id + " wasn't found");
    }
}
