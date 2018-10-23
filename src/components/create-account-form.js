
// Libraries
import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';

// Actions
import {login} from '../actions/auth';
import {registerUser} from '../actions/users';

// Component
import ErrorNotification from './error-notification';

// Validators
import {required, nonEmpty, length, isTrimmed} from '../validators';
const passwordLength = length({min: 10, max: 72});

export class CreateAccountForm extends React.Component {
    onSubmit(values) {
        console.log(values);
        const {firstName, lastName, email, password} = values;
        // this.props.dispatch(to an registerUser fetch(POST))
        // return this.props.dispatch(registerUser(user))
        // .then(() => this.props.dispatch(login(username, password)));
        // Login component
    }

    render() {
        let error;
        if (this.props.error) {
            error = (<ErrorNotification {...this.props.error} />);
        }
        return(
            <form id="create-account-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                {error}
                <label htmlFor="firstName">First Name:</label>
                <Field name="firstName" id="create-account-first-name" placeholder="Bob" validate={[required, nonEmpty]} component="input" />
                <label htmlFor="lastName">Last Name:</label>
                <Field name="lastName" id="create-account-last-name" placeholder="Smith" validate={[required, nonEmpty]} component="input" />
                <label htmlFor="email">E-mail:</label>
                <Field name="email" type="email" id="create-account-email" placeholder="BobSmith@email.com" validate={[required, nonEmpty, isTrimmed]} component="input" />
                <label htmlFor="password">Password:</label>
                <Field name="password" type="password" id="create-account-password" placeholder="minimum 10 characters" validate={[required, passwordLength, isTrimmed]} component="input" />
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