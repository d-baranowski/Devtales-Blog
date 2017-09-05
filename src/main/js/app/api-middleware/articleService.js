import request from 'superagent';

const articleService = store => next => action => {
    /*
     Pass all actions through by default
     */
    next(action);
    switch (action.type) {
        case 'CREATE_ARTICLE':
            request
                .post('/api/article')
                .data(action.data)
                .end((err, res) => {
                    if (err) {
                        /*
                         in case there is any error, dispatch an action containing the error
                         */
                        return next({
                            type: 'CREATE_ARTICLE_ERROR', //Naming convention for data service action types is “<ACTION>_<NAME>_<STATUS>”
                            err
                        })
                    }

                    next({
                        type: 'CREATE_ARTICLE_SUCCESS',
                        id: res //Id of newly created
                    })
                });
        case 'ARTICLE_GET_ALL':
            /*
             In case we receive an action to send an API request, send the appropriate request
             */
            request
                .get('/api/article')
                .end((err, res) => {
                    if (err) {
                        /*
                         in case there is any error, dispatch an action containing the error
                         */
                        return next({
                            type: 'ARTICLE_GET_ALL_ERROR', //Naming convention for data service action types is “<ACTION>_<NAME>_<STATUS>”
                            err
                        })
                    }
                    const data = JSON.parse(res.text);

                    /*
                     Once data is received, dispatch an action telling the application
                     that data was received successfully, along with the parsed data
                     */
                    next({
                        type: 'ARTICLE_GET_ALL_RECEIVED',
                        data
                    })
                });
            break;
        /*
         Do nothing if the action does not interest us
         */
        default:
            break
    }

};

export default articleService