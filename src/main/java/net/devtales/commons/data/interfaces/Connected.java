package net.devtales.commons.data.interfaces;

import org.springframework.jdbc.core.JdbcTemplate;

/**
 * Created by Daniel on 12/09/2017.
 */
public interface Connected {

    JdbcTemplate getJdbcTemplate();
}
