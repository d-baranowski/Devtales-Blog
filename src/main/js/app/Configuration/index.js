// @flow
import type {ApplicationReducerType} from "./ApplicationReducer";

export {ApplicationStoreFactory} from "./ApplicationStoreFactory"
export {ApplicationReducer, ApplicationReducerInitialState} from "./ApplicationReducer"
export type {ApplicationReducerType, Dispatch} from "./ApplicationReducer"
export type Store = {
    getState() : ApplicationReducerType
}
export type Action = {
    type: string;
}