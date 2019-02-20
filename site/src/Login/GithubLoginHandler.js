import React from 'react';
import {withRouter} from "react-router";

const GithubLoginHandler = (props) => {
    const {
        match: {
            params: {
                access_token
            }
        }
    } = props;

    localStorage.setItem("devtales-github-token", {access_token, established: Date.now()});
    props.history.push(localStorage.getItem("devtales-login-return-to"));
    return null;
};

GithubLoginHandler.propTypes = {};

export default withRouter(GithubLoginHandler);