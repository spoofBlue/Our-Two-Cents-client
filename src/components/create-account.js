
import React from 'react';
import {Link} from 'react-router-dom';
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
function CreateAccountSection() {
    return (
        <section class="create-account-section">
            <h2>Create your Account</h2>
            <CreateAccountForm />
        </section>
    );  
}

class CreateAccountForm extends React.Component {
    onSubmit(values) {
        console.log(values);
        const {email, password} = values;
        // this.props.dispatch(to an registerUser fetch(POST))
        // Login component
    }

    render() {
        let error;
        if (this.props.error) {
            error = (<Error text={...this.props.error} />);
        }
        return(
            <form id="create-account-form" role="form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                {error}
                <label htmlFor="email">E-mail:</label>
                <Field name="email" type="text" id="create-account-email" placeholder="BobSmith@email.com" component="input" required />
                <label htmlFor="password">Password:</label>
                <Field name="password" type="password" id="create-account-password" placeholder="minimum 10 characters" component="input" required />
                <p> In joining this site, I agree to engage in civil and respectful discussion with my peers.  Despite our difference in perspectives, I seek to gain a greater understanding of others through our conversations.</p>
                <Field name="agreement" type="checkbox" id="create-account-agreement" component="input" required />
                <p>I agree.</p>
                <button type="submit">Sign Up</button>
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