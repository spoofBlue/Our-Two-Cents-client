
// Libraries
import React from 'react';
import { reduxForm, Field } from 'redux-form';

export class CreateConversationForm extends React.Component {
    render() {
        return (
            <form className="create-conversation-form" onSubmit={this.props.handleSubmit(value => this.props.onViewpointSubmit(value))}>
                <label htmlFor="viewpoint">What is your stance on the topic?</label>
                <Field name="viewpoint" wrap="hard" cols="200" rows="4" maxLength="300" placeholder="Limited to 300 characters." id="input-user-viewpoint" component="textarea" required />
                <button type="submit">Open Conversation</button>
            </form>
        );
    }
}

export default reduxForm({
    form: "viewpoint"
})(CreateConversationForm);