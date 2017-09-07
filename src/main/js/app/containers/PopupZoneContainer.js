import React, { Component }  from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    if (state.messageReducer) {
        return {
            messages: state.messageReducer.messages || []
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