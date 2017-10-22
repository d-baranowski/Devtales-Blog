package net.devtales.blog.state;

public class AdminReducer {
    private boolean isAdmin;

    public boolean isAdmin() {
        return isAdmin;
    }

    public AdminReducer setAdmin(boolean admin) {
        isAdmin = admin;
        return this;
    }
}
