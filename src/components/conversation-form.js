
import React from 'react';
import { reduxForm, Field, reset, change } from 'redux-form';
import Input from './input';

export class ConversationForm extends React.Component {
    onSubmit(message) {
        this.props.sendMessage(message);
        this.props.dispatch(reset(`messagenger`));
    }

    render() {
        return (
            <form className="conversation-form" onSubmit={this.props.handleSubmit(value => this.onSubmit(value))}>
                <label htmlFor="message"> Enjoy your conversation! Remember our guidelines on keeping conversations civil and informative :)</label>
                <Field name="message" wrap="hard" cols="300" rows="5" maxLength="500" placeholder="Message here..." id="input-message" component="textarea" />
                <button type="submit" disabled={this.props.conversationFinished} className="submit-message-button">Send</button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'messagenger'
})(ConversationForm);