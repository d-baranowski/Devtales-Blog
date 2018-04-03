package net.devtales.blog.state;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class AdminReducer {
    @JsonProperty("isAdmin")
    private boolean isAdmin;

    @JsonIgnore
    public boolean isAdmin() {
        return isAdmin;
    }

    public AdminReducer setAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
        return this;
    }
}
