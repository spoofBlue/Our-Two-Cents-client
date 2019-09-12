
import React from 'react';
import { Link } from 'react-router-dom';

import './landing-page-section.css';
import imagePersonOne from '../images/bruce-mars-pexels-two.jpg';
import imagePersonTwo from '../images/bruce-mars-pexels-one.jpg';
import imagePersonThree from '../images/computer-contemporary-cup-1251833.jpg';
import imagePersonFour from '../images/beard-confused-digital-nomad-874242.jpg';

export default function LandingPageSection() {
    return (
        <section className="landing-page-section">
            <div className="site-description-item site-description-item-one">
                <p>At Our Two Cents, we bridge the conversation gap between individuals with different opinions
                on controversial issues. By encouraging the exchange of backgrounds, outlooks on life, and their stories, we help you understand
                the thought process of the other side.</p>
            </div>
            <Link className="landing-page-continue-to-login-link" to="./login">Continue Into the Site</Link>
            <img src={imagePersonOne} alt="Person-One" className="image-landing-page" />
            <img src={imagePersonTwo} alt="Person-Two" className="image-landing-page" />
            <div className="site-description-item site-description-item-two">
                <p>Ever wonder how some people hold such different opinions? Wish you could understand
                their perspective better?</p>
            </div>
            <img src={imagePersonThree} alt="Person-Three" className="image-landing-page" />
            <img src={imagePersonFour} alt="Person-Four" className="image-landing-page" />
            <div className="site-description-item site-description-item-three">
                <p>Connect with others for a 1-on-1 discussion on hot-button issues and reach a better understanding.
                Hear their two cents on Our Two Cents today.</p>
            </div>
        </section>
    );
}