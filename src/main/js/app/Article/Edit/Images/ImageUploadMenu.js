// @flow
import React, {Component} from "react";
import {If} from "../../../Utility";
import type {Props} from "./ImageUploadMenuContainer"

function Image(props) {
    return <img onClick={props.image.onClick} src={props.image.thumb} />
}

class ImageUploadMenu extends Component<Props> {
    handleAddImageClick : (e : SyntheticEvent<*>) => void;

    constructor(props : Props) {
        super(props);
        this.handleAddImageClick = this.handleAddImageClick.bind(this);
    }

    componentWillMount() {
        if (!this.props.images) {
            this.props.getImages();
        }
    }

    handleAddImageClick(e : SyntheticEvent<*>) {
        e.preventDefault();
        this.props.uploadImage()
    }

    render() {
        const actualImages = this.props.images || [];
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

        let imageElements = [];

        for (let image of withFunction) {
            imageElements.push(<Image key={image.image} image={image}/>)
        }

        return (
        <div>
            <button id="displayImageUploadMenuButton" onClick={this.props.toggleMenu}>Display Menu</button>
            <If _={this.props.showMenu}>
                <div className="overlay-menu">
                    <div className="body">{imageElements}</div>
                    <div className="footer">
                        <form id="imageUploadForm">
                            <input name="file" type="file" />
                            <button id="uploadImage" onClick={this.handleAddImageClick}>Add Image</button>
                        </form>
                    </div>
                </div>
            </If>
        </div>
        );
    }
}

export default ImageUploadMenu;