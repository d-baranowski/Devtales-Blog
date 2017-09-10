package net.devtales.blog.data;


import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

public class ValidatorPool {
    private static Validator instance;
    public static Validator getValidator() {
        if (instance == null) {
            ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
            instance = factory.getValidator();
        }
        return instance;
    }
}
