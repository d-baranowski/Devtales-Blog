import React, {Component} from 'react';
import {connect} from 'react-redux';
import PageNavigation from './PageNavigation';
import {withRouter} from 'react-router';

const mapStateToProps = (state) => {
    return {
        showMenu: state.PageNavigationReducer.navigationMenuIsOpen
    };
};

const mapDispatchToProps = (dispatch) => {
    return({
        toggleMenu: () => dispatch({type: 'TOGGLE_NAVIGATION_MENU'})
    });
};

export const PageNavigationContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(
    class PageNavigationContainer extends Component<Props> {
        render() {
            return <PageNavigation
                toggleMenu={this.props.toggleMenu}
                showMenu={this.props.showMenu}/>;
        }
    }));
