// @flow
import type {Action, ApplicationActionCreator} from '../../../Configuration';
import type {MessageReducerType} from '../messageReducer';

type NotificationHideType = 'NOTIFICATION_HIDE';

export type NotificationHideAction = {
    type: NotificationHideType,
    id: number
};

type Creator = ApplicationActionCreator<MessageReducerType, NotificationHideAction, NotificationHideType>

const removeProperty = (obj, property) => {
    return  Object.keys(obj).reduce((acc, key) => {
        if (key !== property) {
            return {...acc, [key]: obj[key]};
        }
        return acc;
    }, {});
};

export const NotificationHide: Creator = {
    type: 'NOTIFICATION_HIDE',
    reduce: (state: MessageReducerType, action: NotificationHideAction): MessageReducerType => {
        return {...state, messages: removeProperty(state.messages, action.id)};
    },
    match: (action: Action) => NotificationHide.type === action.type,
    create: (id: number) => ({
        type: NotificationHide.type,
        id: id + ''
    })
};