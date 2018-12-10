// @flow
import React, {Component} from 'react';

type Props = {
    onToggle: (style: string) => void,
    style: string,
    label: string,
    active: boolean
}

class StyleButton extends Component<Props> {
    onToggle: (e: SyntheticMouseEvent<*>) => void;

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
            <div className={className} onClick={this.onToggle}>
                {this.props.label}
            </div>
        );
    }
}

export default StyleButton;