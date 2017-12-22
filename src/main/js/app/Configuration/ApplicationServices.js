import {ImagesService, ArticleService} from "../Edit";
import {routerMiddleware} from "react-router-redux";

export const ApplicationServices = (history) => {
    return ({
        routerMiddleware: routerMiddleware(history),
        ArticleService,
        ImagesService
    });
};

