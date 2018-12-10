import React, { Component } from 'react';

export const LoginCallbackComponentFactory = (auth) => class LoginCallbackComponent extends Component {
    handleAuthentication = (props) => {
        if (/access_token|id_token|error/.test(props.location.hash)) {
            auth.handleAuthentication();
            this.props.goToHomePage();
        }
    };

    render() {
        this.handleAuthentication(this.props);
        return null;
    }
};
