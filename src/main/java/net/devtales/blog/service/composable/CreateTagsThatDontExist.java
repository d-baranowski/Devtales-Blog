package net.devtales.blog.service.composable;

import net.devtales.blog.data.TagDAO;
import net.devtales.blog.data.model.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.function.Function;

@Component
public class CreateTagsThatDontExist implements Function<Set<Tag>, Set<Tag>> {
    @Autowired
    TagDAO tagDAO;

    @Override
    public Set<Tag> apply(Set<Tag> tags) {
        List<Tag> existing = tagDAO.readAll();
        tags.removeAll(existing);
        for (Tag t: tags) {
            t.setId(tagDAO.create(t));
        }
        return tags;
    }
}
