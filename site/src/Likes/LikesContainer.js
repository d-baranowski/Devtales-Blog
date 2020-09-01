import React, {Component} from 'react';
import icons from "../Megadraft/src/icons";

const LikeIcon = icons.LikeIcon;
const DislikeIcon = icons.DislikeIcon;

class LikesContainer extends Component {
    render() {
        return (
            <div className="like-container">
                <div
                    className={"interactive-icon like-icon" + (this.props.liked ? " liked" : "")}>
                    <LikeIcon/>
                </div>
                <div
                    className={"interactive-icon dislike-icon" + (this.props.disliked ? " disliked" : "")}>
                    <DislikeIcon/>
                </div>
            </div>
        );
    }
}

LikesContainer.propTypes = {};

export default LikesContainer;