import {ArticleService} from '../Article/Edit';
import {routerMiddleware} from 'react-router-redux';

export const ApplicationServices = (history) => {
    return [
        routerMiddleware(history),
        ArticleService
    ];
};

