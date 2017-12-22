import superagent from 'superagent';

const ArticleService = store => next => action => {
    /*
     Pass all actions through by default
     */
    next(action);
    switch (action.type) {
        case 'CREATE_ARTICLE':
            superagent
                .post('/api/article')
                .send(action.data)
                .end((err, res) => {
                    if (err) {
                        /*
                         in case there is any error, dispatch an action containing the error
                         */
                        next({
                            type: 'CREATE_ARTICLE_ERROR', //Naming convention for data service action types is “<ACTION>_<NAME>_<STATUS>”
                            err,
                            data: {message: err}
                        });
                    } else {
                        next({
                            type: 'CREATE_ARTICLE_SUCCESS',
                            data: res
                        });
                    }
                });
            break;
        case 'UPDATE_ARTICLE':
            superagent
                .put('/api/article/' + action.id)
                .send(action.data)
                .end((err, res) => {
                    if (err) {
                        /*
                         in case there is any error, dispatch an action containing the error
                         */
                        next({
                            type: 'UPDATE_ARTICLE_ERROR', //Naming convention for data service action types is “<ACTION>_<NAME>_<STATUS>”
                            err,
                            data: {message: err}
                        });
                    } else {
                        next({
                            type: 'UPDATE_ARTICLE_SUCCESS',
                            data: res
                        });
                    }
                });
            break;
        case 'PUBLISH_ARTICLE':
            superagent
                .patch('/api/article/' + action.id)
                .send()
                .end((err, res) => {
                    if (err) {
                        /*
                         in case there is any error, dispatch an action containing the error
                         */
                        next({
                            type: 'PUBLISH_ARTICLE_ERROR', //Naming convention for data service action types is “<ACTION>_<NAME>_<STATUS>”
                            err,
                            data: {message: err}
                        });
                    } else {
                        next({
                            type: 'PUBLISH_ARTICLE_SUCCESS',
                            data: res.body
                        });
                    }
                });
            break;
        case 'HIDE_ARTICLE':
            superagent
                .delete('/api/article/' + action.id)
                .send()
                .end((err, res) => {
                    if (err) {
                        /*
                         in case there is any error, dispatch an action containing the error
                         */
                        next({
                            type: 'HIDE_ARTICLE_ERROR', //Naming convention for data service action types is “<ACTION>_<NAME>_<STATUS>”
                            err,
                            data: {message: err}
                        });
                    } else {
                        next({
                            type: 'HIDE_ARTICLE_SUCCESS',
                            data: res.body
                        });
                    }
                });
            break;
        case 'ARTICLE_GET_ALL':
            /*
             In case we receive an action to send an API request, send the appropriate request
             */
            const isAdmin = store.getState().adminReducer.isAdmin;
            superagent
                .get(isAdmin ? '/api/article/all' : '/api/article')
                .end((err, res) => {
                    if (err) {
                        /*
                         in case there is any error, dispatch an action containing the error
                         */
                        return next({
                            type: 'ARTICLE_GET_ALL_ERROR', //Naming convention for data service action types is “<ACTION>_<NAME>_<STATUS>”
                            data: {message: err}
                        });
                    } else {
                        const data = JSON.parse(res.text);

                        /*
                         Once data is received, dispatch an action telling the application
                         that data was received successfully, along with the parsed data
                         */
                        next({
                            type: 'ARTICLE_GET_ALL_RECEIVED',
                            data
                        });
                    }
                });
            break;
        /*
         Do nothing if the action does not interest us
         */
        default:
            break
    }

};

export default ArticleService