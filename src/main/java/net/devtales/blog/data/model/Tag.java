package net.devtales.blog.data.model;

import lombok.Getter;
import lombok.Setter;
import net.devtales.blog.data.annotation.CollumnName;
import net.devtales.blog.data.annotation.TableName;

@TableName("T_Tag")
public class Tag extends BaseDataModel {
    @CollumnName("val") @Getter @Setter
    private String value;
}
