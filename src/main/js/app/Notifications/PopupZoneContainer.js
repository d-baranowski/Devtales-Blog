import React, { Component }  from 'react';
import { connect } from 'react-redux';
import type {ApplicationReducerType} from "../Configuration"

const mapStateToProps = (state : ApplicationReducerType) => {
    if (state.MessageReducer) {
        return {
            messages: state.MessageReducer.messages || []
        }
    } else {
        return {
            messages: []
        }
    }
};

const mapDispatchToProps = (dispatch) => {
    return({});
};

const PopupZoneContainer = connect(mapStateToProps, mapDispatchToProps)(class extends Component {
    render() {
        return <PopupZone />
    }
});

export default PopupZoneContainer;