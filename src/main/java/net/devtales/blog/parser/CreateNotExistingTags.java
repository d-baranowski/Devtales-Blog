package net.devtales.blog.parser;

import net.devtales.blog.model.Tag;
import net.devtales.blog.repository.TagRepository;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
import java.util.function.Function;

@Component
public class CreateNotExistingTags implements Function<Set<Tag>, Set<Tag>> {
    private final TagRepository tagRepository;

    public CreateNotExistingTags(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public Set<Tag> apply(Set<Tag> detachedTags) {
        final Set<Tag> attachedTags = new HashSet<>();
        for (Tag element: detachedTags) {
            if (element.getValue() != null && !element.getValue().isEmpty()) {
                Tag tag = tagRepository.findByValue(element.getValue());
                if (tag != null) {
                    attachedTags.add(tag);
                } else {
                    attachedTags.add(tagRepository.save(new Tag(element.getValue())));
                }
            }
        }
        return attachedTags;
    }
}
