package net.devtales.blog.data.parser;

public abstract class ParsesInto<I,O> {
    public abstract O parse(I input);
}
