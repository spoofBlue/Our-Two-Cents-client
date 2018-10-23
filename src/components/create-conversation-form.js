
// Libraries
import React from 'react';
import {reduxForm, Field} from 'redux-form';

export class CreateConversationForm extends React.Component {    
    render() {
        return (
            <form onSubmit={this.props.handleSubmit(value => this.props.onViewpointSubmit(value))}>
                <label htmlFor="viewpoint">What is your stance on the topic?</label>
                <Field name="viewpoint" type="text" id="input-user-viewpoint" component="input" required />
                <button type="submit">Open Conversation</button>
            </form>
        );
    }
}

export default reduxForm({
    form : "viewpoint"
})(CreateConversationForm);