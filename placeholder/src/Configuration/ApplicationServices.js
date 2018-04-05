import {ImagesService, ArticleService} from '../Article/Edit';
import {AdminService} from '../Admin';
import {routerMiddleware} from 'react-router-redux';

export const ApplicationServices = (history) => {
    return [
        routerMiddleware(history),
        ArticleService,
        ImagesService,
        AdminService
    ];
};

