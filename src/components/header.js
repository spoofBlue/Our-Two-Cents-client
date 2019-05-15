
import React from 'react';
import {Link} from 'react-router-dom';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import Image from 'react-bootstrap/lib/Image';
import DropdownMenu from './dropdown-menu';

import './header.css';

export default function Header(props) {
    return (
        <header role="banner">
            <h1 className="site-title">Our Two Cents</h1>
            <a className="header-home-icon hidden-xs" href="./home"><span className="hidden"></span></a>
            <DropdownMenu loggedIn={props.loggedIn} onClick={props.onClick} />
        </header>
    );
}