package net.devtales.commons.data.interfaces;

import net.devtales.blog.data.model.BaseDataModel;
import net.devtales.commons.data.exceptions.DataManipulationFailedException;

import java.lang.reflect.Field;
import java.util.Optional;

import static net.devtales.commons.generator.InsertGenerator.generateLinkQuery;
import static net.devtales.commons.generator.InsertGenerator.retrieveListFieldTypeName;

public interface Link<P, C> extends Connected {

    default void link(P parent, C child) throws ClassNotFoundException, DataManipulationFailedException {
        Field toLink = null;
        for (Field f :parent.getClass().getDeclaredFields()){
            Optional<String> listFieldTypeName = retrieveListFieldTypeName(f);

            if (!listFieldTypeName.isPresent()) {
                continue;
            }
            if (listFieldTypeName.get().equals(child.getClass().getTypeName())) {
                toLink = f;
            }
        }

        BaseDataModel _parent = (BaseDataModel) parent;
        BaseDataModel _child = (BaseDataModel) child;

        if (toLink == null) {
            throw new DataManipulationFailedException(
                    "Parent %s does not have a field which is a collection of type child %s.",
                    parent.getClass().getName(), child.getClass().getName());
        }

        Optional<String> query = generateLinkQuery(parent.getClass(), toLink);

        if (!query.isPresent()) {
            throw new DataManipulationFailedException(
                    String.format("Its impossible to generate link query for parent %s and link %s",
                            parent.getClass().toString(),
                            toLink.toString()));
        }

        this.getJdbcTemplate().update(query.get(), _parent.getId(), _child.getId());
    }
}
