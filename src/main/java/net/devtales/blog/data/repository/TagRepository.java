package net.devtales.blog.data.repository;

import net.devtales.blog.data.model.Tag;
import org.springframework.data.repository.CrudRepository;

public interface TagRepository extends CrudRepository<Tag, Long> {
    public Tag findByValue(String value);
}
