import {articleService} from "../Edit/index";
import imagesService from "../Edit/imagesService";
import {routerMiddleware} from "react-router-redux";

const ApplicationServices = (history) => {
    return ({
        routerMiddleware: routerMiddleware(history),
        articleService,
        imagesService
    });
};

export default ApplicationServices;