package net.devtales.blog.data.model;

import lombok.Getter;
import lombok.Setter;
import net.devtales.blog.data.annotation.Column;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;

import static net.devtales.blog.generator.util.Utilities.getColumnFields;

public class BaseDataModel {
    @Column(name = "_id", type = "INT(11) NOT NULL AUTO_INCREMENT", primary = true) @Getter @Setter
    Integer id;
}
