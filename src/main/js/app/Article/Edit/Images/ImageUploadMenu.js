import React from "react";
import {If} from "../../../Utility";

function Image(props) {
    return <img onClick={props.image.onClick} src={props.image.thumb} />
}

class ImageUploadMenu extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddImageClick = this.handleAddImageClick.bind(this);
    }

    handleAddImageClick(e) {
        e.preventDefault();
        this.props.uploadImage()
    }

    render() {
        const images = this.props.images ? this.props.images : [];

        let imageElements = [];

        for (let image of images) {
            imageElements.push(<Image key={image.image} image={image} />)
        }

        return (
        <div>
            <button onClick={this.props.toggleMenu}>Add Image</button>
            <If _={this.props.showMenu}>
                <div className="overlay-menu">
                    <div className="body">{imageElements}</div>
                    <div className="footer">
                        <form id="imageUploadForm">
                            <input name="file" type="file" />
                            <button onClick={this.handleAddImageClick}>Add Image</button>
                        </form>
                    </div>
                </div>
            </If>
        </div>
        );
    }
}

export default ImageUploadMenu;