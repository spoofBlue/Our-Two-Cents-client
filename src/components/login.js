
import React from 'react';
import {BrowserRouter as Link} from 'react-router-dom';
import {reduxForm, Field} from 'redux-form';

function Header() {
    return (
        <header role="header">
            <h1>Our Two Cents</h1>
            <Link to="./main-page.html">Home (icon link)</Link>
            <Link to="./landing-page.html">About Our Site (icon link)</Link>
        </header>
    );
}

function LoginSection {
    return (
        <section class="login-section">
            <h2>Sign In to your account.</h2>
            <LoginForm />
            <h3><Link to="./create-account.html">Or sign up to create your account...</Link></h3>
        </section>
    );
}

class LoginForm extends React.component {
    onSubmit(values) {
        console.log(values);
        const {email, password} = values;
        // this.props.dispatch(to an authUser fetch(GET))
        // Home component
    }

    render() {
        let error;
        if (this.props.error) {
            error = (<Error text={...this.props.error} />);
        }
        return(
            <form id="login-form" role="form" onSubmit={this.props.handleSubmit(values => this.onSubmit(value))}>
                {error}
                <label htmlFor="email">E-mail:</label>
                <Field name="email" type="text" id="login-email" placeholder="BobSmith@email.com" component="input" required />
                <label htmlFor="password"></label>
                <Field name="password" type="password" id="login-password" placeholder="minimum 10 characters" component="input" required/>
                <button type="submit">Sign In</button>
                (Button doesn't work yet, <a href="./main-page.html">Sign In Link</a>)
            </form>
        );
    }
}

function Error(props) {
    return (
        <div class="error-notification">
            <p>{props.error.text}</p>
        </div>
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