import React from "react";

const Tile = (props) => {
    return (
        <a className="tile" href={props.repo}>
            <div className="body">
                <img  src={props.imageSrc} />
            </div>
            <div className="overlay">
                {props.children}
            </div>
            <div className="footer">
                <h3>
                    {props.title}
                </h3>
            </div>
        </a>
    )
};

const Projects = (props) => {

    return (
        <div className="tile-parent">
            <Tile title="Snake in Python"
                  repo="https://github.com/d-baranowski/Pyhton-Snake-Game"
                  imageSrc="https://github.com/d-baranowski/Pyhton-Snake-Game/raw/master/demo.gif?raw=true">
                <p>A fun little exercise I prepared to show school kids the capabilities of python.
                Its a Snake Game with build in autopilot using A* path finding algorithm. The A* algorithm
                is not working fully because it doesn't take in account where the tail will be after each
                    move which can cause the snake to trap itself. Its still fun to watch the snake find its way to apples.
                </p>
            </Tile>
            <Tile title="Free Continuous Integration"
                  repo="https://github.com/d-baranowski/example-github-ci"
                  imageSrc="https://github.com/d-baranowski/example-github-ci/blob/master/dreamteam.png?raw=true">
                <p>An example project setup which uses services which provide a way of achieving continuous integration
                    for free for open source projects.</p>
            </Tile>
            <Tile title="JS Matrix Letters"
                  repo="https://github.com/d-baranowski/MatrixJsFun"
                  imageSrc="https://github.com/d-baranowski/MatrixJsFun/blob/master/matrix.gif?raw=true">
                <p>I was bored one day and decided to create a screen of falling green letters inspired by Matrix movie. It has very bad performance
                    but it still makes for a fun to watch spectacle.</p>
            </Tile>
        </div>
    )
};

export default Projects;