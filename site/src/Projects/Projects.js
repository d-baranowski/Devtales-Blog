// @flow
import React from 'react';

type TileProps = {
    repo: string,
    imageSrc: string,
    children: any,
    title: string
};

const Tile = (props: TileProps) => {
    return (
        <a className="tile" href={props.repo}>
            <div className="body">
                <object data={props.imageSrc} >
                    <div className="spinner"></div>
                </object>
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
    );
};

export const Projects = () => {

    return (
        <div className="tile-parent">
            <Tile title="AsteroiDeath Match"
                  repo="https://devtales.net/projects/asteroideatch-match/index.html"
                  imageSrc="https://devtales.net/img/asteroideatch-match.gif">
                <p>
                    Simple online multi-player game using WebRtc and MessagePack. The
                    game does not require a server. The player's browsers communicate with one another.
                </p>
            </Tile>
            <Tile title="Gravity Balls"
                  repo="https://devtales.net/projects/gravity-balls/index.html"
                  imageSrc="https://devtales.net/img/gravity-balls.gif">
                <p>
                    Little demo I've build to try out WebRTC DataChannel. Each time someone visits the page a random
                    string is generated. When a second person enters the page with the same random string then they'll
                    join the fun.
                </p>
            </Tile>
            <Tile title="5e Character Sheet"
                  repo="https://github.com/d-baranowski/dnd-character-sheet"
                  imageSrc="https://devtales.net/img/character-sheet-project.png">
                <p>
                    Dungeons and Dragons character sheet I've built for my friends to use while we play.
                    It's an Electron app built using React and Redux. All the UI is created using SVGs generated from
                    the original D&D character sheet PDF. I can do some pretty cool things with DOM manipulations on inline svg elements.
                </p>
            </Tile>
            <Tile title="Snake in Python"
                repo="https://github.com/d-baranowski/Pyhton-Snake-Game"
                imageSrc="https://devtales.net/blog-content/snake.gif">
                <p>
                Snake Game with build in autopilot using A* path finding. It's not working fully because it doesn‘t take in account where the tail will be after each
                    move which can cause the snake to trap itself. Its still fun to watch the snake find its way to apples.
                </p>
            </Tile>
            <Tile title="Free CI"
                repo="https://github.com/d-baranowski/example-github-ci"
                imageSrc="https://devtales.net/blog-content/ci.png">
                <p>An example project setup which uses services which provide a way of achieving continuous integration
                    for free for open source projects.</p>
            </Tile>
            <Tile title="JS Matrix Letters"
                repo="https://github.com/d-baranowski/MatrixJsFun"
                imageSrc="https://devtales.net/blog-content/matrix.gif">
                <p>I was bored one day and decided to create a screen of falling green letters inspired by Matrix movie. It has very bad performance
                    but it still makes for a fun to watch spectacle.</p>
            </Tile>
        </div>
    );
};