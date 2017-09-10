package net.devtales.commons.data.interfaces;

import net.devtales.commons.data.exceptions.DataManipulationFailedException;

public interface Create<T> {
    public Integer create(T obj) throws DataManipulationFailedException;
}
