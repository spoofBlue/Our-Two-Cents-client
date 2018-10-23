
// Libraries
import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

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
            <h3><Link to="./create-account">Or sign up to create your account...</Link></h3>
        </section>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginSection);