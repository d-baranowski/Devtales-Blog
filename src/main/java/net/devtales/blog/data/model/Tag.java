package net.devtales.blog.data.model;

import lombok.Getter;
import lombok.Setter;
import net.devtales.commons.data.annotation.Column;
import net.devtales.commons.data.annotation.TableName;

@TableName()
public class Tag extends BaseDataModel {
    @Column(name = "val", type = "VARCHAR(5)") @Getter @Setter
    private String value;

    public Tag(String value) {
        super();
        this.value = value;
    }
}
