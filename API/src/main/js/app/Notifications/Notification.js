// @flow
import React, {Component} from 'react';

type Props = {
    message: string,
    status: string,
    onHide: () => void
}

const Notification = class NotificationsContainer extends Component<Props> {
    componentWillMount() {
        this.props.onHide();
    }

    render() {
        const className = 'notification notification-' + this.props.status.toLowerCase();
        return (
            <div className={className}>
                {this.props.message}
            </div>
        );
    }
};

export default Notification;