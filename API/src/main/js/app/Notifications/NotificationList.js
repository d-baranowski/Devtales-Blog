// @flow
import React from 'react';
import Notification from './Notification';
import type {MessagesType} from './index';
import {CSSTransitionGroup} from 'react-transition-group';


type Props = {
    messages: MessagesType,
    onHide: (id: number) => void
}

const NotificationList = (props: Props) => {
    const notifications = [];
    let message;
    for (let msgKey in props.messages) {
        if (props.messages.hasOwnProperty(msgKey)) {
            message = props.messages[msgKey];
            notifications.push(
                <Notification
                    key={'notification notification-' + message.id}
                    message={message.msg}
                    status={message.status}
                    onHide={() => props.onHide(message.id)}
                />
            );
        }
    }
    return (
        <div id={'notification-list'}>
            <CSSTransitionGroup
                transitionName="appear"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                {notifications}
            </CSSTransitionGroup>
        </div>
    );
};

export default NotificationList;