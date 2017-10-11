package net.devtales.blog.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@EqualsAndHashCode
@ToString
@Entity
@Getter
@Setter
public class Tag {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    @Column(nullable = false, unique = true, length = 32)
    private String value;

    public Tag() {}

    public Tag(String val) {
        this.value = val;
    }

    public Tag(Integer id, String val) {
        this.id = id;
        this.value = val;
    }


}
