package net.devtales.blog.api.repository;

import net.devtales.blog.api.model.Tag;
import org.springframework.data.repository.CrudRepository;

public interface TagRepository extends CrudRepository<Tag, Long> {
    public Tag findByValue(String value);
}
