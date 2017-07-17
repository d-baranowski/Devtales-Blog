package net.devtales.blog.data.model;

import lombok.Getter;
import lombok.Setter;
import net.devtales.blog.data.annotation.CollumnName;
import net.devtales.blog.data.annotation.LinkTable;
import net.devtales.blog.data.annotation.TableName;

@TableName("T_Article")
public class Article extends BaseDataModel {
    @CollumnName("title") @Getter @Setter
    private String title;
    @CollumnName("body") @Getter @Setter
    private String body;
    @LinkTable("T_Article_Tags") @Getter @Setter
    private Tag[] tags;

    public static Article EMPTY = new Article();
}
