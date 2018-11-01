
// Libraries
import React from 'react';

export default function AvailableConvesation(props) {
    function onClick(e) {
        e.preventDefault();
        const availableConversationData = {
            conversationId : props.conversationId, 
            hostUserId: props.hostUserId,
            hostUsername : props.hostUsername,
            topicId : props.topicId, 
            topicName : props.topicName 
        };
        props.startConversation(availableConversationData);
    }

    return (
        <li className="available-conversation-item">
            <h3 className="available-conversation-topicName">{props.topicName}</h3>
            <p className="available-conversation-hostUsername">{props.hostUsername}</p>
            <p className="available-conversation-hostViewpoint">{props.hostViewpoint}</p>
            <button className="start-conversation-button" onClick={onClick}>Start Conversation</button>
        </li>
    );
}