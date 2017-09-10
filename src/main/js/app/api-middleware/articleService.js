import superagent from 'superagent';

const articleService = store => next => action => {
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
                        })
                    }

                    next({
                        type: 'CREATE_ARTICLE_SUCCESS',
                        id: res, //Id of newly created
                        data: {message: res}
                    })
                });
        case 'ARTICLE_GET_ALL':
            /*
             In case we receive an action to send an API request, send the appropriate request
             */
            superagent
                .get('/api/article')
                .end((err, res) => {
                    if (err) {
                        /*
                         in case there is any error, dispatch an action containing the error
                         */
                        return next({
                            type: 'ARTICLE_GET_ALL_ERROR', //Naming convention for data service action types is “<ACTION>_<NAME>_<STATUS>”
                            data: {message: err}
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