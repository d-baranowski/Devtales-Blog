// @flow
import type {Action, ApplicationActionCreator} from '../../../../../Configuration';
import type {ImagesReducerType} from '../ImagesReducer';

type ImagesToggleMenuType = 'TOGGLE_MENU';

export type ImagesToggleMenuAction = {
    type: ImagesToggleMenuType
}

type Creator = ApplicationActionCreator<ImagesReducerType, ImagesToggleMenuAction, ImagesToggleMenuType>


export const ImagesToggleMenu: Creator = {
    type: 'TOGGLE_MENU',
    reduce: (state: ImagesReducerType): ImagesReducerType => ({
        ...state,
        showMenu: !state.showMenu
    }),
    match: (action: Action) => ImagesToggleMenu.type === action.type,
    create: () => ({ type: ImagesToggleMenu.type})
};