import React, {Component} from "react";

class StyleButton extends Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'styleButton';
        if (this.props.active) {
            className += ' active';
        }
        return (
            <div className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </div>
        );
    }
}

export default StyleButton;