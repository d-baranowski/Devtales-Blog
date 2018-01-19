// @flow
import React from 'react';

type Props = {
    isOpen: boolean,
    toggleMenu: () => void
}

const HamburgerComponent = (props: Props) => {
    return (
        <div id="nav-icon-container">
            <div onClick={props.toggleMenu} id="nav-icon" className={props.isOpen ? 'open' : ''}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default HamburgerComponent;