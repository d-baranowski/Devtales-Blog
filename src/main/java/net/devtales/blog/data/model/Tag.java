package net.devtales.blog.data.model;

import lombok.Getter;
import lombok.Setter;
import net.devtales.blog.data.annotation.Column;
import net.devtales.blog.data.annotation.TableName;

@TableName()
public class Tag extends BaseDataModel {
    @Column(name = "val", type = "VARCHAR(5)") @Getter @Setter
    private String value;
}
