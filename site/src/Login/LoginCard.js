import React from 'react';
import {connect} from "react-redux";

const loginWithGithub = () => {
    sessionStorage.setItem("devtales-login-return-to", window.location.pathname);
    const searchParams = new URLSearchParams({
        client_id: process.env.REACT_APP_GITHUB_CI_KEY,
        scope: 'user:email'
    });

    window.location = `https://github.com/login/oauth/authorize?${searchParams.toString()}`
};

const LoginCard = (props) => (
    props.show && <div className="login">
        <div className="card">
            <div style={{fontWidth: 500}}>Login</div>
            <img onClick={loginWithGithub} className="hover-move clickable" width={150} src="/img/octocat.svg" />
        </div>
    </div>
);

LoginCard.propTypes = {};

const mapStateToProps = (state) => {
    return {
        show: state.LoginReducer.showLoginCard
    }
};

export default connect(mapStateToProps)(LoginCard);