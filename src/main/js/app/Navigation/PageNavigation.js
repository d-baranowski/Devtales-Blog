import React from "react";
import {NavLink} from "react-router-dom";

class PageNavigation extends React.Component {

    render() {
        return (
            <header>
                <img id="logo" src="/img/devtalesico.svg"/>
                <nav>
                    <img id="title" src="/img/title.svg"/>
                    <ul>
                        <li><NavLink activeClassName="active" exact to="/">Blog</NavLink></li>
                        <li><NavLink activeClassName="active" to="/projects">Projects</NavLink></li>
                        <li><NavLink activeClassName="active" to="/about">About</NavLink></li>
                    </ul>
                </nav>
               <div id="searchBar">{/*<input placeholder="search" className="pretty-input"/><i className="fa fa-search" aria-hidden="true"/>*/}</div>
            </header>
        )
    }
}

export default PageNavigation