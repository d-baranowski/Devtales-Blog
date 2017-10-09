package net.devtales.blog.service.composable;


import com.google.common.collect.Lists;
import net.devtales.blog.data.model.Tag;
import net.devtales.blog.data.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.function.Function;

@Component
public class CreateTagsThatDontExist implements Function<Set<Tag>, List<Tag>> {
    @Autowired
    private final TagRepository tagRepo;

    public CreateTagsThatDontExist(TagRepository tagRepo) {
        this.tagRepo = tagRepo;
    }

    @Override
    public List<Tag> apply(Set<Tag> tags) {
        List<Tag> existing = Lists.newArrayList(tagRepo.findAll());
        tags.removeAll(existing);
        List<Tag> result = new ArrayList<>();
        for (Tag t: tags) {
            result.add(tagRepo.save(t));
        }
        return result;
    }
}
