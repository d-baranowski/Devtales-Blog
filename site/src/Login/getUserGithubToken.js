import {decryptMessage} from "../Security/encryption";

export default () => {
    const {access_token} = sessionStorage.getItem("devtales-github-token");

    if (access_token) {
        return decryptMessage(access_token);
    }

    return Promise.resolve({});
}