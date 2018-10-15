
import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPageSection() {
    return (
        <section class="landing-page-section">
            <h2>About Our Site</h2>
            <p>Do you ever wonder how some people have such different opinions?  Do wish you could understand their perspective better? At Our Two Cents, we want to...</p>
            <Link to="./login.html">Continue Onto the Site</Link>
        </section>
    );
}