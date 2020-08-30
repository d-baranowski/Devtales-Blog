// javascript //
import React from 'react';

const defaultMapStateToProps = (props) => props;

const connect = (store, mapStateToProps = defaultMapStateToProps) => (WrappedComponent) => {
    return class extends React.Component {
        state = mapStateToProps(store);

        componentDidMount() {
            this.unsubscribe = store.subscribe((newValue) => {
                this.setState(mapStateToProps(newValue))
            });
        }

        componentWillUnmount() {
            this.unsubscribe();
        }

        render() {
            const joinedProps = {
                ...this.props,
                ...this.state
            };
            return <WrappedComponent
                {...joinedProps}
            />;
        }
    };
};

export default connect;