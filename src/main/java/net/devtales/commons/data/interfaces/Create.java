package net.devtales.commons.data.interfaces;

import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import static net.devtales.commons.generator.InsertGenerator.generateInsertPreparedStatement;

public interface Create<T> extends Connected {
    default Integer create(T obj) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        this.getJdbcTemplate().update(
                connection -> generateInsertPreparedStatement(connection,obj,this.getClass()),
                keyHolder);

        return keyHolder.getKey().intValue();
    }
   // public Integer create(T obj) throws DataManipulationFailedException;
}
