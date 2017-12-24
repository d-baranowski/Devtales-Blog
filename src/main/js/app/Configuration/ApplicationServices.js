import {ImagesService, ArticleService} from "../Article/Edit";
import {routerMiddleware} from "react-router-redux";

export const ApplicationServices = (history) => {
    return ({
        routerMiddleware: routerMiddleware(history),
        ArticleMiddleware: ArticleService,
        ImagesMiddleware: ImagesService
    });
};

