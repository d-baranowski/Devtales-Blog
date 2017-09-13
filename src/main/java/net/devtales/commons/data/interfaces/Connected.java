package net.devtales.commons.data.interfaces;

import org.springframework.jdbc.core.JdbcTemplate;

public interface Connected {

    JdbcTemplate getJdbcTemplate();
}
