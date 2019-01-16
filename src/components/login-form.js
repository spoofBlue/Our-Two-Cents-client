
// Libraries
import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';

// Actions
import {login} from '../actions/auth';

// Components
import Input from './input';

// Validators
import {required, nonEmpty} from '../validators';

// Specific CSS
import './login-section.css';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.email, values.password));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (<p className="error">{this.props.error}</p>);
        }
        return(
            <form id="login-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                {error}
                <label htmlFor="email">E-mail:</label>
                <Field name="email" type="email" placeholder="BobSmith@email.com" validate={[required, nonEmpty]} component={Input} />
                <label htmlFor="password">Password:</label>
                <Field name="password" type="password" placeholder="minimum 10 characters" validate={[required, nonEmpty]} component={Input} />
                <button type="submit">Sign In</button>
            </form>
        );
    }
}

export default reduxForm({
    form : "login",
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('login', Object.keys(errors)[0]))
})(LoginForm);