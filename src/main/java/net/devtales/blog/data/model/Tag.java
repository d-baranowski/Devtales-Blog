package net.devtales.blog.data.model;

import lombok.Getter;
import lombok.Setter;
import net.devtales.commons.data.annotation.Column;
import net.devtales.commons.data.annotation.TableName;

import java.util.Objects;

@TableName()
public class Tag extends BaseDataModel {
    @Column(name = "val", type = "VARCHAR(50)") @Getter @Setter
    private String value;

    public Tag(String value) {
        super();
        this.value = value;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tag tag = (Tag) o;
        return Objects.equals(getValue(), tag.getValue());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getValue());
    }
}
