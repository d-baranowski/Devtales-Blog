package net.devtales.commons.data.exceptions;


public class DataManipulationFailedException extends Exception {

    public DataManipulationFailedException(String msg){
        super(msg);
    }

    public DataManipulationFailedException(String msg, String... params){
        super(String.format(msg, params));
    }
}
