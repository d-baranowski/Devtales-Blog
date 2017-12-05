import React from "react";
import If from "./If";

function Image(props) {
    return <img src={props.image.thumb} />
}

class ImageUploadMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showMenu: false};
        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.handleAddImageClick = this.handleAddImageClick.bind(this);
    }

    handleToggleClick() {
        this.setState(prevState => ({
            showMenu: !prevState.showMenu
        }));
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
            <button onClick={this.handleToggleClick}>Add Image</button>
            <If _={this.state.showMenu}>
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