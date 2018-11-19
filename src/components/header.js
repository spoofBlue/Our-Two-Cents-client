
import React from 'react';
import {Link} from 'react-router-dom';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import Image from 'react-bootstrap/lib/Image';

import './header.css';

export default function Header(props) {
    let logout;
    if (props.loggedIn) {
        logout = (
            <Thumbnail className="header-logout-button hidden-xs" src="./images-small/logout2.png" alt="Logout" href="./login" onClick={props.onClick} />
        );
    }
    return (
        <header role="banner">
            <h1>Our Two Cents</h1>
            <Thumbnail className="header-home-icon hidden-xs " src="./images-small/home.png" alt="Home" href="./home" />
            <div className="header-right-icons">
                <Thumbnail className="header-hamburger-menu hidden-sm hidden-md hidden-lg" src="./images-small/information-icon.png" alt="Menu" />
                <Thumbnail className="header-about-our-site-icon hidden-xs" src="./images-small/information-icon.png" alt="Help" href="./landing-page" />
                {logout}
            </div>
        </header>
    );
}