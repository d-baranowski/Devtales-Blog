import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import HamburgerComponent from "./HamburgerComponent";
import ResponsiveNavComponent from "./ResponsiveNavComponent";

import type {Props} from "./PageNavigationContainer";

class PageNavigation extends Component<Props> {
    render() {
        return (
            <header>
                <img id="logo" src="/img/devtalesico.svg"/>
                <nav>
                    <img id="title" src="/img/title.svg"/>
                    <HamburgerComponent toggleMenu={this.props.toggleMenu} isOpen={this.props.showMenu}/>
                    <ResponsiveNavComponent isOpen={this.props.showMenu}>
                        <ul>
                            <li><NavLink onClick={this.props.toggleMenu} activeClassName="active" exact to="/">Blog</NavLink></li>
                            <li><NavLink onClick={this.props.toggleMenu} activeClassName="active" to="/projects">Projects</NavLink></li>
                            <li><NavLink onClick={this.props.toggleMenu} activeClassName="active" to="/about">About</NavLink></li>
                        </ul>
                    </ResponsiveNavComponent>
                </nav>
               <div id="searchBar">{/*<input placeholder="search" className="pretty-input"/><i className="fa fa-search" aria-hidden="true"/>*/}</div>
            </header>);

    }
}

export default PageNavigation