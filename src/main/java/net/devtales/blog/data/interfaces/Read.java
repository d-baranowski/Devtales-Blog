package net.devtales.blog.data.interfaces;

import java.util.List;

/**
 * Created by Daniel on 08/07/2017.
 */
public interface Read<T> {
    public T read(int id);
    public List<T> readAll();
}
