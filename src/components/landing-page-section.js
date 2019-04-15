
import React from 'react';
import { Link } from 'react-router-dom';

import './landing-page-section.css';

export default function LandingPageSection() {
    return (
        <section className="landing-page-section">
            <h2>About Our Site</h2>
            <div className="site-description-item site-description-item-one">
                <p className="item-one-text">Ever wonder how some people hold such different opinions? Wish you could understand their
                perspective better?</p>
            </div>
            <div className="site-description-item site-description-item-two">
                <p className="item-two-text">At Our Two Cents, we bridge the conversational gap between individuals who wish to understand
                each other, including their background, general outlook, rationale, and their story.</p>
            </div>
            <div className="site-description-item site-description-item-three">
                <p className="item-three-text">Connect with others for a 1-on-1 discussion on hot-button issues and reach a better understanding.
                Hear their two cents on Our Two Cents today.</p>
            </div>
            <Link to="./login">Continue Onto the Site</Link>
        </section>
    );
}

/*
    Provide CSS for these specific boxes.
*/