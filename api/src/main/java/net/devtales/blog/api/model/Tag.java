package net.devtales.blog.api.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    public Integer id;
    @Column(nullable = false, unique = true)
    public String value;

    public Tag() {}

    public Tag(String val) {
        this.value = val;
    }

    public Tag(Integer id, String val) {
        this.id = id;
        this.value = val;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
