package net.devtales.blog.data.model;

import lombok.Getter;
import lombok.Setter;
import net.devtales.blog.data.annotation.Column;
import net.devtales.blog.data.annotation.LinkTable;
import net.devtales.blog.data.annotation.TableName;

import javax.validation.constraints.Size;

@TableName
public class Article extends BaseDataModel {
    @Column(name = "title", type = "VARCHAR(30)") @Getter @Setter
    @Size(max = 30, message = "Title can't be longer than 30 characters.")
    private String title;
    @Column(name = "body", type = "VARCHAR(20480)") @Getter @Setter
    @Size(max = 20480, message = "Body can't be longer than 20480 characters.")
    private String body;
    @LinkTable("Article_Tags") @Getter @Setter
    private Tag[] tags;

    public static final Article EMPTY = new Article();
}
