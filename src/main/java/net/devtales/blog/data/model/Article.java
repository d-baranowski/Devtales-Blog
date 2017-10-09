package net.devtales.blog.data.model;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.validation.constraints.Size;
import java.sql.Timestamp;
import java.util.Set;

import static javax.persistence.CascadeType.*;

@Entity
@Getter
@Builder
@ToString
@EqualsAndHashCode
public class Article {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    @Size(max = 30, message = "Title can't be longer than 30 characters.")
    private final String title;
    @Size(max = 50, message = "Title can't be longer than 50 characters.")
    private final String slug;
    @Size(max = 20480, message = "Html can't be longer than 20480 characters.")
    private final String html;
    @Size(max = 1024, message = "Summary can't be longer than 1024 characters.")
    private final String summary;
    private Timestamp createdOn;
    private Timestamp updatedOn;
    @Size(max = 20480, message = "Json representation can't be longer than 20480 characters.")
    private final String jsonRepresentation;
    @ManyToMany(cascade = {MERGE, PERSIST})
    private final Set<Tag> tags;

    public Article setCreatedOn(Timestamp createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public Article setUpdatedOn(Timestamp updatedOn) {
        this.updatedOn = updatedOn;
        return this;
    }

    public Article setId(Integer id) {
        this.id = id;
        return this;
    }
}
