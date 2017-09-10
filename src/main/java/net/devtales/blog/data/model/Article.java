package net.devtales.blog.data.model;

import lombok.Getter;
import lombok.Setter;
import net.devtales.blog.data.annotation.Column;
import net.devtales.blog.data.annotation.LinkTable;
import net.devtales.blog.data.annotation.TableName;

import javax.validation.constraints.Size;
import java.sql.Timestamp;
import java.util.List;

@TableName
public class Article extends BaseDataModel {
    @Column(name = "title", type = "VARCHAR(30)") @Getter @Setter
    @Size(max = 30, message = "Title can't be longer than 30 characters.")
    private String title;
    @Column(name = "slug", type = "VARCHAR(50)") @Getter @Setter
    @Size(max = 50, message = "Title can't be longer than 50 characters.")
    private String slug;
    @Column(name = "html", type = "VARCHAR(20480)") @Getter @Setter
    @Size(max = 20480, message = "Html can't be longer than 20480 characters.")
    private String html;
    @Column(name = "summary", type = "VARCHAR(1024)") @Getter @Setter
    @Size(max = 1024, message = "Summary can't be longer than 1024 characters.")
    private String summary;
    @Column(name = "createdOn", type = "DATETIME") @Getter @Setter
    private Timestamp createdOn;
    @Column(name = "updatedOn", type = "DATETIME") @Getter @Setter
    private Timestamp updatedOn;
    @Column (name = "jsonRepresentation", type = "VARCHAR(20480)") @Getter @Setter
    @Size(max = 20480, message = "Json representation can't be longer than 20480 characters.")
    private String jsonRepresentation;

    @LinkTable("Article_Tags") @Getter @Setter
    private List<Tag> tags;

    public static final Article EMPTY = new Article();
}
