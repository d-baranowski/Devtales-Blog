package net.devtales.commons.data.interfaces;

import net.devtales.commons.data.exceptions.DataManipulationFailedException;

/**
 * Created by Daniel on 08/07/2017.
 */
public interface Create<T> {
    public void create(T obj) throws DataManipulationFailedException, DataManipulationFailedException;
}
