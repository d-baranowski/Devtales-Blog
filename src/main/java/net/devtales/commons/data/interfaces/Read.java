package net.devtales.commons.data.interfaces;

import net.devtales.commons.data.util.ReflectionsRowMapper;
import net.devtales.commons.generator.SelectGeneratorPool;

import java.util.List;

public interface Read<T> extends Connected, Modeled<T> {
    T read(int id);
    default List<T> readAll() {
        return getJdbcTemplate().query(SelectGeneratorPool.getSelectGenerator(getModel()).selectQuery(), new ReflectionsRowMapper<>(getModel()));
    }
}
