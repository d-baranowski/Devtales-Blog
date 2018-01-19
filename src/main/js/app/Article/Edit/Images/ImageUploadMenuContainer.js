// @flow
import ImageUploadMenu from './ImageUploadMenu';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import type {ApplicationReducerType} from '../../../Configuration';
import type {Images} from '../index';

export type Props = {
    images: Images,
    showMenu: boolean,
    getImages: Function,
    uploadImage: Function,
    toggleMenu: Function,
    addImage: (imageUrl: string) => void; //Passed from editor used as confirmation
}

const mapStateToProps = (state: ApplicationReducerType) => {
    return {
        images: state.ImagesReducer.images,
        showMenu: state.ImagesReducer.showMenu
    };
};

const getImagesAction = {
    type: 'GET_IMAGES'
};

const uploadImageAction = {
    type: 'UPLOAD_IMAGE',
    data: 'imageUploadForm'
};

const mapDispatchToProps = (dispatch) => {
    return({
        getImages: () => dispatch(getImagesAction),
        uploadImage: () => dispatch(uploadImageAction),
        toggleMenu: () => dispatch({type: 'TOGGLE_MENU'})
    });
};

export const ImageUploadMenuContainer = connect(mapStateToProps, mapDispatchToProps)(class ImageUploadMenuContainer extends Component<Props> {
    render() {
        return <ImageUploadMenu toggleMenu={this.props.toggleMenu}
            showMenu={this.props.showMenu}
            uploadImage={this.props.uploadImage}
            getImages={this.props.getImages}
            addImage={this.props.addImage}
            images={this.props.images}/>;
    }
});