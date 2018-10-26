
// Libraries
import React from 'react';

// Components
import CreateConversationForm from './create-conversation-form';

export default function ChooseViewpointSection(props) {
    function onClick() {
        props.onCancelViewpointSection();
    }

    return (
        <section className="choose-viewpoint-section">
        <h2>You chose {props.createConvoData.topicName}.</h2>
            <CreateConversationForm {...props} />
        <button className="cancel-topic-button" onClick={onClick}>Cancel</button>
        </section>
    );
}