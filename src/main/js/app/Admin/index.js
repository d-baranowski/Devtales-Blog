// @flow
import {AdminServiceFactory} from "./AdminService"
import {HttpRequester} from "../HttpRequest";

export const AdminService = AdminServiceFactory(HttpRequester);
export {AdminReducer, AdminReducerInitialState} from "./AdminReducer"

export type {AdminReducerType} from "./AdminReducer"
