import React from 'react';
import {withRouter} from "react-router";
import {encryptMessage} from "../Security/encryption";

const GithubLoginHandler = (props) => {
    const {
        match: {
            params: {
                access_token
            }
        }
    } = props;

    encryptMessage(access_token).then(encrypted => {
        sessionStorage.setItem("devtales-github-token", {access_token: encrypted, established: Date.now()});
    });
    props.history.push(sessionStorage.getItem("devtales-login-return-to"));
    return null;
};

GithubLoginHandler.propTypes = {};

export default withRouter(GithubLoginHandler);