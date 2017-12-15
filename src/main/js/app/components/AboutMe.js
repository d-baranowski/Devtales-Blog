import React from "react";

const AboutMe = (props) => {

    return (
        <div className="article-container">
            <h1>About Me</h1>
            <img className="float-left top-right-corner-margins" src="/img/round-profile-small.png"/>
            <p>My name is Daniel and I'm a software developer based in Leeds, Great Britain. Beyond programming I love internet memes, computer games and Dungeons and Dragons. Java is my native tongue,
                but
                I'm also comfortable with JavsScript, C# and SQL. </p>

            <p className="clear-left">As a programmer I spend a considerable amount of time fixing bugs. Sometimes problems I encounter don't
                make sense. In these situations the internet is my best friend. Programmers form an amazing worldwide
                community which openly shares code and solutions to problems. <b>We've got each
                    other's backs!</b> I feel that I own a great deal of my professional success to the internet and I decided
                to create this blog to start to repay that debt. I've built it with Java Spring Boot as the backend and
                React.js in the frontend. I plan to post my own discoveries in here, hoping that someone
                somewhere will find it useful. <b>Happy Coding!</b></p>

            <h1>Contact</h1>
            <p>Don't hesitate to contact me with any questions or requests you might have.</p>
            <div className="social">
                <a href="https://www.linkedin.com/in/daniel-baranowski-220011a8/"><img
                    src="https://ed.team/sites/default/files/social-icons/linkedin-icon.png" width="50"/></a>
                <a href="https://github.com/d-baranowski"><img
                    src="https://ed.team/sites/default/files/social-icons/github-icon.png" width="50"
                    /></a>
                <a href="mailto:dan@devtales.net">
                    <img src="https://ed.team/themes/custom/escueladigital/img/email.svg" width="45"
                         className="email" /></a>
            </div>
        </div>
    )
};

export default AboutMe;