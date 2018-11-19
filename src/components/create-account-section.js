
// Libraries
import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';

import Modal from 'react-bootstrap/lib/Modal';

// Components
import CreateAccountForm from './create-account-form'

export function CreateAccountSection(props) {
    if (props.loggedIn) {
        return <Redirect to="/home" />;
    }
    return (
        <div className="container">
            <Modal.Dialog>
                <section className="create-account-section"> 
                    <Modal.Header>
                        <Modal.Title>Create your Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateAccountForm error={props.error} />
                        <p>Already signed up? <Link to="./login">Login here...</Link></p>
                    </Modal.Body>
                </section>
            </Modal.Dialog>
        </div>
    );  
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    error: state.auth.error
});

export default connect(mapStateToProps)(CreateAccountSection);

/*
<Modal.Dialog>
    <section className="create-account-section"> 
        <Modal.Header>
            <Modal.Title>Create your Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <CreateAccountForm error={props.error} />
            <p>Already signed up? <Link to="./login">Login here...</Link></p>
        </Modal.Body>
    </section>
</Modal.Dialog>

<section className="create-account-section">
            <h2>Create your Account</h2>
            <CreateAccountForm error={props.error} />
        </section>
*/