
import React from 'react';
import {BrowserRouter as Link} from 'react-router-dom';

function Header() {
    return (
        <header role="header">
            <h1>Our Two Cents</h1>
            <Link to="./main-page.html">Home (icon link)</Link>
            <Link to="./landing-page.html">About Our Site (icon link)</Link>
        </header>
    );
}

function AboutSiteText() {
    return (
        <main>
            <h2>About Our Site</h2>
            <section class="about-our-site-section">
                <p>Do you ever wonder how some people have such different opinions?  Do wish you could understand their perspective better? At Our Two Cents, we want to...</p>
                <Link to="./login.html">Continue Onto the Site</Link>
            </section>
        </main>
    );
}

function Footer() {
    return (
        <footer role="footer">
            <ul>
                <li><Link to="./landing-page.html">About Our Site</Link></li>
                <li>Contact Us : dummy-email@email.com</li>
            </ul>
        </footer>
    );
}