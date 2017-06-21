import React from "react";
import {NavLink} from "react-router-dom";

class PageNavigation extends React.Component {
    render() {
        return (
            <header>
                <img id="logo" src="img/devtalesico.svg"/>
                <nav>
                    <div className="title">Devtales</div>
                    <ul>
                        <li><NavLink activeClassName="active" exact to="/">Blog</NavLink></li>
                        <li><NavLink activeClassName="active" to="/projects">Projects</NavLink></li>
                        <li><NavLink activeClassName="active" to="/about">About</NavLink></li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default PageNavigation