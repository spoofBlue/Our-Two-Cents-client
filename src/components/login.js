
// Libraries
import React from 'react';
import {Link} from 'react-router-dom';
import {reduxForm, Field, focus} from 'redux-form';

// Actions
import {login} from '../actions/auth';

// Components
import ErrorNotification from './error-notification';

// Validators
import {required, nonEmpty} from '../validators';

export class LoginForm extends React.component {
    onSubmit(values) {
        console.log(values);
        const {email, password} = values;
        // return this.props.dispatch(login(values.username, values.password));
        // Home component
    }

    render() {
        let error;
        if (this.props.error) {
            error = (<ErrorNotification {...this.props.error} />);
        }
        return(
            <form id="login-form" role="form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                {error}
                <label htmlFor="email">E-mail:</label>
                <Field name="email" type="email" id="login-email" placeholder="BobSmith@email.com" validate={[required, nonEmpty]} component="input" />
                <label htmlFor="password"></label>
                <Field name="password" type="password" id="login-password" placeholder="minimum 10 characters" validate={[required, nonEmpty]} component="input" />
                <button type="submit">Sign In</button>
                (Button doesn't work yet, <Link to="./home.html">Sign In Link autosend to Home</Link>)
            </form>
        );
    }
}

export default reduxForm({
    form : "login",
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('login', Object.keys(errors)[0]))
})(LoginForm);