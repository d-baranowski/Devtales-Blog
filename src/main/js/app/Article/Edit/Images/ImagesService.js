// @flow
import type {HttpRequesterInterface} from "../../../HttpRequest";
import type {Store} from "../../../Configuration";

type GetImagesResponseType = {
    body: string[]
}

export const ImagesServiceFactory =
    (httpRequester: HttpRequesterInterface, FormDataService: (formId: string | number) => FormData) =>
    (store : Store) =>
    (next : (action: {type: string}) => void) =>
    (action: any) => {
        /*
         Pass all actions through by default
         */
        next(action);
        switch (action.type) {
            case 'GET_IMAGES':
                httpRequester
                    .get('/file', (err, res : GetImagesResponseType) => {
                        if (err) {
                            next({
                                type: 'GET_IMAGES_ERROR',
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
                if (!action.data) {
                    next({
                        type: 'UPLOAD_IMAGE_ERROR',
                        data: {message: "Failed to upload image. Action was missing data."}
                    });
                    break;
                }

                let formData;

                try {
                    formData = FormDataService(action.data)
                } catch (error) {
                    next({
                        type: 'UPLOAD_IMAGE_ERROR',
                        err: error,
                        data: {message: error}
                    });
                    break;
                }

                httpRequester
                    .post('/file', formData, (err, res) => {
                        if (err) {
                            next({
                                type: 'UPLOAD_IMAGE_ERROR',
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
            default:
                break
        }
};