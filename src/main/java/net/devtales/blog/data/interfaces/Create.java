package net.devtales.blog.data.interfaces;

import net.devtales.blog.data.exceptions.DataManipulationFailedException;

/**
 * Created by Daniel on 08/07/2017.
 */
public interface Create<T> {
    public void create(T obj) throws DataManipulationFailedException;
}
