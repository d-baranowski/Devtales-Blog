import React from "react";
import If from "./If";

function ImageAddMenu() {
    return (
        <div>
            Hello Menu!
        </div>
    );
}

class ImageUploadMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showMenu: false};
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() {
        this.setState(prevState => ({
            showMenu: !prevState.showMenu
        }));
    }

    render() {
        return (
        <div>
            <button onClick={this.handleToggleClick}>Add Image</button>
            <If _={this.state.showMenu}>
                <ImageAddMenu />
            </If>
        </div>
        );
    }
}

export default ImageUploadMenu;