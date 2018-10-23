
import React from 'react';
import {Link} from 'react-router-dom';

import './header.css';

export default function Header() {
    return (
        <header role="banner">
            <h1>Our Two Cents</h1>
            <Link className="header-home-icon" to="./home">Home (icon link)</Link>
            <Link className="header-about-our-site-icon" to="./landing-page">About Our Site (icon link)</Link>
        </header>
    );
}