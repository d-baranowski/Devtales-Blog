import React from "react";

const Audio = (props) => {
    return <audio className="media" controls src={props.src} />;
};
const Image = (props) => {
    return <img className="media" src={props.src} />;
};
const Video = (props) => {
    return <video className="media" controls src={props.src} />;
};
const Media = (props) => {
    const entity = props.contentState.getEntity(
        props.block.getEntityAt(0)
    );
    const {src} = entity.getData();
    const type = entity.getType();
    let media;
    if (type === 'audio') {
        media = <Audio src={src}/>;
    } else if (type === 'image') {
        media = <Image src={src}/>;
    } else if (type === 'video') {
        media = <Video src={src}/>;
    }
    return media;
};

export default Media;