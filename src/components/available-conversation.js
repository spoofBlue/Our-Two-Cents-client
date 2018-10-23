
// Libraries
import React from 'react';

export default function AvailableConvesation(props) {
    function onClick(e) {
        e.preventDefault();
        const availableConversationData = {
            conversationId : props.conversationId, 
            conversationUserId: props.conversationUserId, 
            topicId : props.topicId, 
            topicName : props.topicName 
        };
        props.startConversation(availableConversationData);
    }

    return (
        <li className="available-conversation-item">
            <h3 className="topic">{props.topicName}</h3>
            <p className="viewpoint">{props.userViewpoint}</p>
            <button className="start-conversation-button" onClick={onClick}>Start Conversation</button>
        </li>
    );
}