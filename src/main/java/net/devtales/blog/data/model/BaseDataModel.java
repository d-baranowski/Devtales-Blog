package net.devtales.blog.data.model;

import lombok.Getter;
import lombok.Setter;
import net.devtales.commons.data.annotation.Column;

public class BaseDataModel {
    @Column(name = "_id", type = "INT(11) NOT NULL AUTO_INCREMENT", primary = true) @Getter @Setter
    Integer id;
}
