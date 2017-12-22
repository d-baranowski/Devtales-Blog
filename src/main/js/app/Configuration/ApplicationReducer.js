import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import articleReducer from '../Edit/ArticleReducer';
import messageReducer from '../Notifications/messageReducer';
import adminReducer from '../Admin/adminReducer';
import imagesReducer from '../Edit/imagesReducer';

const ApplicationReducer = combineReducers({
    articleReducer,
    messageReducer,
    adminReducer,
    imagesReducer,
    router: routerReducer
});
export default ApplicationReducer;