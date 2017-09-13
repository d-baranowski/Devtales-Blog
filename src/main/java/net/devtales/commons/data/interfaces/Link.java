package net.devtales.commons.data.interfaces;

import net.devtales.blog.data.model.BaseDataModel;

import java.lang.reflect.Field;

import static net.devtales.commons.generator.InsertGenerator.generateLinkQuery;
import static net.devtales.commons.generator.InsertGenerator.retrieveListFieldTypeName;

public interface Link<P, C> extends Connected {

    default void link(P parent, C child) throws ClassNotFoundException {
        Field toLink = null;
        for (Field f :parent.getClass().getDeclaredFields()){
            if (retrieveListFieldTypeName(f).equals(child.getClass().getTypeName())) {
                toLink = f;
            }
        }

        BaseDataModel _parent = (BaseDataModel) parent;
        BaseDataModel _child = (BaseDataModel) child;

        this.getJdbcTemplate().update(generateLinkQuery(parent.getClass(), toLink), _parent.getId(), _child.getId());
    }
}
