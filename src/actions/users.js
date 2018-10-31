
import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {authError} from './auth';

export const registerUser = user => dispatch => {
    console.log('in registerUser. user=', user);
    const userData = packageData(user);
    console.log('in registerUser. userData=', userData);
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => {
        const {reason, message, location} = err;
        if (reason === 'ValidationError') {
            dispatch(authError(err));
            // Convert ValidationErrors into SubmissionErrors for Redux Form
            return Promise.reject(
                new SubmissionError({
                    [location]: message
                })
            );
        }
        return Promise.reject(
            new SubmissionError({
                _error: 'Error submitting user.'
            })
        );
    });
};

// Names user info information to match those expected by the API.
function packageData(user) {
    return ({
        "userEmail" : user.email,
        "userFirstName" : user.firstName,
        "userLastName" : user.lastName,
        "userPassword" : user.password
    });
}