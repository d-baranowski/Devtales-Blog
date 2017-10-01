package net.devtales.blog.unit.generator;

import net.devtales.blog.data.model.Article;
import net.devtales.blog.data.model.Tag;
import net.devtales.commons.generator.CreateTablesGenerator;
import net.devtales.commons.generator.util.ClassFinder;
import org.junit.Assert;
import org.junit.Test;

import java.util.ArrayList;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class CreateTablesGeneratorTest {

    @Test
    public void canGenerateSqlForTag() {
        ClassFinder fakeFinder = mock(ClassFinder.class);

        ArrayList<Class> fakeResult = new ArrayList<>();
        fakeResult.add(Tag.class);
        when(fakeFinder.find("net.devtales.blog.data.model")).thenReturn(fakeResult);

        CreateTablesGenerator sqlGenerator = new CreateTablesGenerator(fakeFinder);


        String expected = "CREATE TABLE T_Tag (\n" +
                "\t_id INT(11) NOT NULL AUTO_INCREMENT,\n" +
                "\tPRIMARY KEY(_id),\n" +
                "\tval VARCHAR(50)\n" +
                ");\n\n";
        Assert.assertEquals(expected, sqlGenerator.generateBaseTablesSQL());
    }

    @Test
    public void canGenerateSqlForLinkTable() throws NoSuchFieldException {
        ClassFinder fakeFinder = mock(ClassFinder.class);
        CreateTablesGenerator sqlGenerator = new CreateTablesGenerator(fakeFinder);

        String result = sqlGenerator.generateLinkTable(Article.class, Article.class.getDeclaredField("tags"));
        String expected = "CREATE TABLE T_Article_Tags (\n" +
                "\tT_Article_Id INT(11),\n" +
                "\tT_Tag_Id INT(11),\n" +
                "\tFOREIGN KEY (T_Article_Id) REFERENCES T_Article(_id),\n" +
                "\tFOREIGN KEY (T_Tag_Id) REFERENCES T_Tag(_id)\n" +
                ");";

        Assert.assertEquals(expected, result);
    }
}
