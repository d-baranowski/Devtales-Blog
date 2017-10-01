package net.devtales.commons.data.exceptions;


public class MappingException extends RuntimeException {
    public MappingException(String msg) {
        super(msg);
    }

    public MappingException(String msg, String... args) {
        super(String.format(msg, args));
    }
}
