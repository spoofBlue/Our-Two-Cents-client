
// Libraries
import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Modal from 'react-bootstrap/lib/Modal';

// CSS
import './login-section.css';

// Components
import LoginForm from './login-form';

export function LoginSection(props) {
    if (props.loggedIn) {
        return <Redirect to="/home" />;
    }
    return (
        <section className="login-section">
            <h2>Sign In to your account.</h2>
            <LoginForm />
            <Link to="./create-account">Or sign up to create your account...</Link>
        </section>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginSection);
