// @flow
import React, {Component} from 'react';
import {If} from '../../../Utility';
import type {Props} from './ImageUploadMenuContainer';
import type {ImageStateType} from './State/ImagesReducer';

type ImageType = {
    image: {
        ...ImageStateType,
        onClick: (e: SyntheticEvent<*>) => void
    }
}

function Image(props: ImageType) {
    return <img alt="" onClick={props.image.onClick} src={props.image.thumb} />;
}

class ImageUploadMenu extends Component<Props> {
    componentWillMount() {
        if (!this.props.images) {
            this.props.getImages();
        }
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
                    addImage(x.image);
                }
            };
        });

        let imageElements = [];

        for (let image of withFunction) {
            imageElements.push(<Image key={image.image} image={image}/>);
        }

        return (
            <div>
                <button id="displayImageUploadMenuButton" onClick={this.props.toggleMenu}>Display Menu</button>
                <If _={this.props.showMenu}>
                    <div className="overlay-menu">
                        <div className="body">{imageElements}</div>
                    </div>
                </If>
            </div>
        );
    }
}

export default ImageUploadMenu;