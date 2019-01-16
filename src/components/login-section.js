
// Libraries
import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import Modal from 'react-bootstrap/lib/Modal';

// CSS
import './login-section.css';

// Components
import LoginForm from './login-form';

export function LoginSection(props) {
    if (props.loggedIn) {
        return <Redirect to="/home" />;
    }
    return (
        <section className="login-section"> 
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Sign In to your account.</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LoginForm />
                        <Link to="./create-account">Or sign up to create your account...</Link>
                    </Modal.Body>
                </Modal.Dialog>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginSection);
    