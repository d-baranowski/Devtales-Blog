import React from 'react';
import ReactDOM from 'react-dom';
import {ArticleEditorContainer} from './Article';
import {Provider} from 'react-redux';
import {ApplicationStoreFactory} from './Configuration';
import {NotificationsContainer} from './Notifications';

const store = ApplicationStoreFactory();

function ClientSideRender() {
    ReactDOM.render(
        <Provider store={store}>
            <div>
                <ArticleEditorContainer />
                <NotificationsContainer />
            </div>
        </Provider>,
        document.getElementById('content')
    );
}

ClientSideRender();