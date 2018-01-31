// @flow
import {ImagesUploadError, ImagesUploadSuccess} from '../index';

import type {FormDataServiceType} from '../../../FormDataService';
import type {HttpRequesterInterface} from '../../../../../../HttpRequest';
import type {Action, ApplicationAsyncActionCreator} from '../../../../../../Configuration';

type ImagesUploadType = 'UPLOAD_IMAGE';

export type ImagesUploadAction = {
    type: ImagesUploadType,
    data: string
}

type Creator = ApplicationAsyncActionCreator<ImagesUploadType>

export const ImagesUpload: Creator = {
    type: 'UPLOAD_IMAGE',
    create: (formId: string): ImagesUploadAction => ({
        type: ImagesUpload.type,
        data: formId
    }),
    match: (action: Action) => (ImagesUpload.type === action.type),
    reduce: (store, next, action: ImagesUploadAction, services) => {
        if (!services || !services.formDataService || !services.httpRequester) {
            throw 'Configuration issue in ImagesUpload async action.';
        }

        const formDataService: FormDataServiceType = services.formDataService;
        const httpRequester: HttpRequesterInterface = services.httpRequester;

        if (!action.data) {
            next(ImagesUploadError.create('Failed to upload image. Action was missing data.'));
            return;
        }

        let formData;

        try {
            formData = formDataService(action.data);
        } catch (error) {
            next(ImagesUploadError.create(error));
            return;
        }

        httpRequester
            .post('/file', formData, (err, res) => {
                if (err) {
                    next(ImagesUploadError.create(err));
                } else {
                    next(ImagesUploadSuccess.create(res.text));
                }
            });
    }
};