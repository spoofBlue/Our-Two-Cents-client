
import React from 'react';
import {reduxForm, Field} from 'redux-form';

export class ConversationForm extends React.Component {
    render() {
        return (
            <form className="conversation-form" onSubmit={values=>this.props.sendMessage(values)}>{/**!!!! */}
                <label htmlFor="messanger">Start your conversation here! Remember our guidelines on keeping conversations civil and informative :)</label>
                <Field name="messanger" type="text" placeholder="Message..." value="" component="input" /> {/**!!!! value component*/}
                <button type="submit" className="submit-message-button">Send</button>
            </form>
        );
    }
}

export default reduxForm({
    form : 'message'
})(ConversationForm);