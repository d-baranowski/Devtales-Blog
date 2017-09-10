package net.devtales.blog.data;

import net.devtales.blog.data.model.Tag;
import net.devtales.commons.data.exceptions.DataManipulationFailedException;
import net.devtales.commons.data.interfaces.Crud;
import net.devtales.commons.generator.SelectGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

import static net.devtales.blog.extensions.LoggersBasket.error;
import static net.devtales.commons.generator.InsertGenerator.generateInsertQuery;
import static net.devtales.commons.generator.InsertGenerator.getArguments;

@Repository
public class TagDAO implements Crud<Tag> {
    @Autowired
    JdbcTemplate jdbcTemplate;

    private final SelectGenerator<Tag> select = new SelectGenerator<>(Tag.class);

    @Override
    public void delete(int id) {

    }

    @Override
    public void update(Tag obj) {

    }

    @Override
    public Tag read(int id) {
        return null;
    }

    @Override
    public List<Tag> readAll() {
        return null;
    }

    @Override
    public Integer create(Tag obj) throws DataManipulationFailedException {
        try {
            jdbcTemplate.update(generateInsertQuery(Tag.class), getArguments(obj, false));
        } catch (IllegalAccessException e) {
            error(this.getClass(),e,
                    "Failed to create Tag %s due to issue with reflections.",
                    obj.toString());
            throw new DataManipulationFailedException("Creating the Tag failed.");
        }

        return 0;
    }
}
