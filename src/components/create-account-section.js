
// Libraries
import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

// Components
import CreateAccountForm from './create-account-form'

export function CreateAccountSection(props) {
    if (props.loggedIn) {
        return <Redirect to="/home" />;
    }
    return (
        <section className="create-account-section">
            <h2>Create your Account</h2>
            <CreateAccountForm error={props.error} />
        </section>
    );  
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    error: state.auth.error
});

export default connect(mapStateToProps)(CreateAccountSection);