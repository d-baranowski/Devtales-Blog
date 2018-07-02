package net.devtales.blog.api.model;


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
public class Article {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    public Long id;
    @Size(max = 500, min = 5,message = "Title can't be longer than 500 characters.")
    public String title;
    @Size(max = 500, min = 5, message = "Title can't be longer than 500 characters.")
    @Column(nullable = false, unique = true, length = 500)
    public String slug;
    @Size(max = 327680, message = "Html can't be longer than 327680 characters.")
    public String html;
    @Size(max = 81920, message = "Title can't be longer than 500 characters.")
    public String summary;
    public Timestamp createdOn;
    public Timestamp updatedOn;
    @OrderBy
    public Timestamp publishedDate;
    @Size(max = 327680, message = "Json representation can't be longer than 327680 characters.")
    public String jsonRepresentation;
    @ManyToMany(cascade = {MERGE, PERSIST})
    public Set<Tag> tags;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getHtml() {
        return html;
    }

    public void setHtml(String html) {
        this.html = html;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public Timestamp getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Timestamp createdOn) {
        this.createdOn = createdOn;
    }

    public Timestamp getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(Timestamp updatedOn) {
        this.updatedOn = updatedOn;
    }

    public Timestamp getPublishedDate() {
        return publishedDate;
    }

    public void setPublishedDate(Timestamp publishedDate) {
        this.publishedDate = publishedDate;
    }

    public String getJsonRepresentation() {
        return jsonRepresentation;
    }

    public void setJsonRepresentation(String jsonRepresentation) {
        this.jsonRepresentation = jsonRepresentation;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }
}
