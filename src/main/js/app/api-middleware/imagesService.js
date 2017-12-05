import superagent from 'superagent';

const imagesService = store => next => action => {
    /*
     Pass all actions through by default
     */
    next(action);
    switch (action.type) {
        case 'GET_IMAGES':
            superagent
                .get('/file')
                .end((err, res) => {
                    if (err) {
                        /*
                         in case there is any error, dispatch an action containing the error
                         */
                        next({
                            type: 'GET_IMAGES_ERROR', //Naming convention for data service action types is “<ACTION>_<NAME>_<STATUS>”
                            err,
                            data: {message: err}
                        });
                    } else {
                        next({
                            type: 'GET_IMAGES_SUCCESS',
                            data: res
                        });
                    }
                });
            break;
        case 'UPLOAD_IMAGE':
            superagent
                .post('/file')
                .send(new FormData(document.getElementById(action.data)))
                .end((err, res) => {
                    if (err) {
                        /*
                         in case there is any error, dispatch an action containing the error
                         */
                        next({
                            type: 'UPLOAD_IMAGE_ERROR', //Naming convention for data service action types is “<ACTION>_<NAME>_<STATUS>”
                            err,
                            data: {message: err}
                        });
                    } else {
                        next({
                            type: 'UPLOAD_IMAGE_SUCCESS',
                            data: res
                        });
                    }
                });
        /*
         Do nothing if the action does not interest us
         */
        default:
            break
    }

};

export default imagesService