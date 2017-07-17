package net.devtales.blog.data.interfaces;

public interface Crud<T> extends Create<T>, Read<T>, Update<T>, Delete<T> {}
