
import React from 'react';
import {Link} from 'react-router-dom';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import Image from 'react-bootstrap/lib/Image';
import DropdownMenu from 'dropdown-menu';

import './header.css';

export default function Header(props) {
    let logout;
    if (props.loggedIn) {
        logout = ( 
            <a className="header-logout-button hidden-xs" href="./login" onClick={props.onClick}><span className="hidden">Logout</span></a>
        );
    }
    return (
        <header role="banner">
            <h1>Our Two Cents</h1>
            <a className="header-home-icon hidden-xs" href="./home"><span className="hidden">Home</span></a>
            <a className="header-hamburger-menu hidden-sm hidden-md hidden-lg" href="./home"><span className="hidden">Menu</span></a>

            <div className="header-right-icons hidden-xs">
                <a className="header-about-our-site-icon hidden-xs" href="./landing-page"><span className="hidden">Info</span></a>
                {logout}
            </div>
        </header>
    );
}

/*
<Thumbnail className="header-home-icon hidden-xs " src="./images-small/home.png" alt="Home" href="./home" />
<Thumbnail className="header-logout-button hidden-xs" src="./images-small/logout2.png" alt="Logout" href="./login" onClick={props.onClick} />
<Thumbnail className="header-hamburger-menu hidden-sm hidden-md hidden-lg" src="./images-small/information-icon.png" alt="Menu" />
<Thumbnail className="header-about-our-site-icon hidden-xs" src="./images-small/information-icon.png" alt="Help" href="./landing-page" />

<input type="image"  src="../images-small/home.png" href="./home" alt="Home" />

<a className="header-home-icon hidden-xs" href="./home">
    <img src="src/images-small/home.png" alt="Home" />
</a>

<a className="header-home-icon hidden-xs" href="./home">
    <img src="src/images-small/home.png" alt="Home" />
</a>

    <DropdownMenu loggedIn={props.loggedIn} onClick={props.onClick} />
*/