import ImageUploadMenu from "./ImageUploadMenu";
import {connect} from "react-redux";
import React, {Component} from "react"

const mapStateToProps = (state) => {
    return {
        images: state.imagesReducer.images,
        showMenu: state.imagesReducer.showMenu
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

const ImageUploadMenuContainer = connect(mapStateToProps, mapDispatchToProps)(class extends Component {
    componentWillMount() {
        this.props.getImages();
    }

    render() {
        const actualImages = this.props.images ? this.props.images : [];
        const addImage = this.props.addImage;
        const withFunction = actualImages.map((x) =>
        {
            return {
                ...x,
                onClick: () => {
                    this.props.toggleMenu();
                    addImage(x.image)
                }
            }
        });

        return <ImageUploadMenu toggleMenu={this.props.toggleMenu}
                                showMenu={this.props.showMenu}
                                uploadImage={this.props.uploadImage}
                                images={withFunction}/>
    }
});

export default ImageUploadMenuContainer;