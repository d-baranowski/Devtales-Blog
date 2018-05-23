import React, { Component } from 'react';

export const LoginComponentFactory = (auth) => class LoginComponent extends Component {
    login = () => {
        auth.login();
    };
    render() {
        const { isAuthenticated } = auth;
        if (!isAuthenticated()) {
            this.login();
        }
        return null;
    }
};
