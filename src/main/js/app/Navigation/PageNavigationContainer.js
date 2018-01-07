// @flow
import React, {Component} from "react";
import {connect} from "react-redux";
import PageNavigation from "./PageNavigation";
import {withRouter} from "react-router";

import type {ApplicationReducerType} from "../Configuration";

export type Props = {
    showMenu: boolean,
    toggleMenu: () => void
}

const mapStateToProps = (state : ApplicationReducerType) => {
    return {
        showMenu: state.PageNavigationReducer.navigationMenuIsOpen
    };
};

const mapDispatchToProps = (dispatch) => {
    return({
        toggleMenu: () => dispatch({type: 'TOGGLE_NAVIGATION_MENU'})
    });
};

export const PageNavigationContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(class extends Component<Props> {
    render() {
        return <PageNavigation toggleMenu={this.props.toggleMenu}
                                showMenu={this.props.showMenu}/>
    }
}));
