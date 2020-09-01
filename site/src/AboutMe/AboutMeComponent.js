import React from 'react';

export const AboutMeComponent = () => {
    return (
        <div className="article-container">
            <h1>About Me</h1>
            <img className="float-left top-right-corner-margins my-face" alt="My face" src="/avatar.png"/>
            <p>My name is Daniel. I'm a Computer Science Graduate and professional software developer. For the entirety of my career I have been
                working as part of small tightly knit teams where engineers are expected to pick up different roles
                depending on circumstances. I thrive in these kind of environments as I enjoy learning new skills to
                solve problems at hand.
                My work experience is mainly in consultancies, where writing clean robust and testable code is part
                of the culture. I care deeply about the quality of my work and continuously educate myself to follow
                highest standards. I worked with object-oriented programming languages such as Java and C# and
                gained experience with other paradigms while programming in Node and GoLang.
                I am passionate about my work and often go the extra mile, learning new things which will benefit
                the projects I work on.</p>

            <h1>Contact</h1>
            <p>Don‘t hesitate to contact me with any questions or requests you might have.</p>
            <div className="social">
                <a href="https://www.linkedin.com/in/daniel-baranowski-220011a8/"><img
                    alt="linkedin"
                    src="/img/linkedin-icon.png" width="50"/></a>
                <a href="https://github.com/d-baranowski"><img
                    alt="github"
                    src="/img/github-icon.png" width="50"
                /></a>
                <a href="mailto:dan@devtales.net">
                    <img src="/img/email.svg" width="45"
                         alt="email"
                         className="email"/></a>
            </div>
        </div>
    );
};
