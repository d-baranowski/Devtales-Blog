import ImageUploadMenu from "../components/ImageUploadMenu";
import {connect} from "react-redux";
import React, {Component} from "react"

const mapStateToProps = (state) => {
    return {
        images: state.imagesReducer.images
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
        uploadImage: () => dispatch(uploadImageAction)
    });
};

const ImageUploadMenuContainer = connect(mapStateToProps, mapDispatchToProps)(class extends Component {
    componentWillMount() {
        this.props.getImages();
    }

    render() {
        return <ImageUploadMenu uploadImage={this.props.uploadImage} images={this.props.images}/>
    }
});

export default ImageUploadMenuContainer;