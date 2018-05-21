package net.devtales.blog.repository;

import net.devtales.blog.model.Tag;
import org.springframework.data.repository.CrudRepository;

public interface TagRepository extends CrudRepository<Tag, Long> {
    public Tag findByValue(String value);
}