// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import NotificationList from './NotificationList';
import {NotificationHide} from './State';
import type {MessagesType} from './index';
import type {ApplicationReducerType} from '../Configuration';



type Props = {
    messages: MessagesType;
    onHide: (id: number) => void;
}

const mapStateToProps = (state: ApplicationReducerType) => {
    return {
        messages: state.MessageReducer.messages
    };
};

const mapDispatchToProps = (dispatch) => {
    return({
        onHide: (id: number) => dispatch(NotificationHide.create(id))
    });
};

export const NotificationsContainer = connect(mapStateToProps, mapDispatchToProps)(
    class NotificationsContainer extends Component<Props> {
        delayedHide = (id) => {
            setTimeout(() => {
                this.props.onHide(id);
            }, 5000);
        };
        render() {
            return <NotificationList onHide={this.delayedHide} messages={this.props.messages} />;
        }
    });