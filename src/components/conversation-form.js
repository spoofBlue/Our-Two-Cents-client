
import React from 'react';
import {reduxForm, Field, reset, change} from 'redux-form';
import Input from './input';

export class ConversationForm extends React.Component {
    onSubmit(message) {
        this.props.sendMessage(message);
        this.props.dispatch(reset(`messagenger`));
    }

    render() {
        return (
            <form className="conversation-form" onSubmit={this.props.handleSubmit(value=>this.onSubmit(value))}>
                <label htmlFor="message">Start your conversation here! Remember our guidelines on keeping conversations civil and informative :)</label>
                <Field name="message" type="textarea" placeholder="Message..." component={Input} />
                <button type="submit" className="submit-message-button">Send</button>
            </form>
        );
    }
}

export default reduxForm({
    form : 'messagenger'
})(ConversationForm);