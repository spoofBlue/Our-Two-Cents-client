
// Libraries
import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';

// Actions
import {login} from '../actions/auth';
import {registerUser} from '../actions/users';

// Component
import Input from './input';

// Validators
import {required, nonEmpty, length, isTrimmed} from '../validators';
const passwordLength = length({min: 10, max: 72});

export class CreateAccountForm extends React.Component {
    onSubmit(user) {
        // user input has firstName, lastName, email, and password
        return this.props.dispatch(registerUser(user))
        .then(res => {
            console.log(res);
            return this.props.dispatch(login(user.username, user.password));
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        let error;
        console.log(`in create-account-form. this.props.error=`, this.props.error);
        if (this.props.error) {
            error = (<p className="error">{this.props.error}</p>);
        }
        return(
            <form id="create-account-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                {error}
                <label htmlFor="firstName">First Name:</label>
                <Field name="firstName" id="create-account-first-name" placeholder="Bob" validate={[required, nonEmpty]} component={Input} />
                <label htmlFor="lastName">Last Name:</label>
                <Field name="lastName" id="create-account-last-name" placeholder="Smith" validate={[required, nonEmpty]} component={Input} />
                <label htmlFor="email">E-mail:</label>
                <Field name="email" type="email" id="create-account-email" placeholder="BobSmith@email.com" validate={[required, nonEmpty, isTrimmed]} component={Input} />
                <label htmlFor="password">Password:</label>
                <Field name="password" type="password" id="create-account-password" placeholder="minimum 10 characters" validate={[required, passwordLength, isTrimmed]} component={Input} />
                <p> In joining this site, I agree to engage in civil and respectful discussion with my peers.  Despite our difference in perspectives, I seek to gain a greater understanding of others through our conversations.</p>
                <Field name="agreement" type="checkbox" id="create-account-agreement" component="input" required />
                <p>I agree.</p>
                <button type="submit" disabled={this.props.pristine || this.props.submitting}> >Sign Up</button>
            </form>
        );
    }
}

export default reduxForm({
    form : 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(CreateAccountForm);