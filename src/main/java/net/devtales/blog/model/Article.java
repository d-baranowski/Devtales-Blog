package net.devtales.blog.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OrderBy;
import javax.validation.constraints.Size;
import java.sql.Timestamp;
import java.util.Set;

import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.CascadeType.PERSIST;

@Entity
@Getter
@ToString
@EqualsAndHashCode
public class Article {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    @Size(max = 500, message = "Title can't be longer than 500 characters.")
    private String title;
    @Size(max = 500, message = "Title can't be longer than 500 characters.")
    @Column(nullable = false, unique = true, length = 500)
    private String slug;
    @Size(max = 327680, message = "Html can't be longer than 327680 characters.")
    private String html;
    private String summary;
    private Timestamp createdOn;
    private Timestamp updatedOn;
    @OrderBy
    private Timestamp publishedDate;
    @Size(max = 327680, message = "Json representation can't be longer than 327680 characters.")
    private String jsonRepresentation;
    @ManyToMany(cascade = {MERGE, PERSIST})
    private Set<Tag> tags;

    public Article setCreatedOn(Timestamp createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public Article setTags(Set<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public Article setUpdatedOn(Timestamp updatedOn) {
        this.updatedOn = updatedOn;
        return this;
    }

    public Article setId(Long id) {
        this.id = id;
        return this;
    }

    public Article setTitle(String title) {
        this.title = title;
        return this;
    }

    public Article setSlug(String slug) {
        this.slug = slug;
        return this;
    }

    public Article setHtml(String html) {
        this.html = html;
        return this;
    }

    public Article setSummary(String summary) {
        this.summary = summary;
        return this;
    }

    public Article setJsonRepresentation(String jsonRepresentation) {
        this.jsonRepresentation = jsonRepresentation;
        return this;
    }

    public Article setPublishedDate(Timestamp publishedDate) {
        this.publishedDate = publishedDate;
        return this;
    }
}
