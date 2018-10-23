
import React from 'react';
import {Link} from 'react-router-dom';

import './footer.css';

export default function Footer() {
    return (
        <footer role="contentInfo">
            <ul>
                <li><Link to="./landing-page">About Our Site</Link></li>
                <li>Created by Cory Nanni, 2018.</li>
            </ul>
        </footer>
    );
}