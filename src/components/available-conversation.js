
// Libraries
import React from 'react';

export default function AvailableConvesation(props) {
    function onClick() {
        const availableConversationData = {conversationId : this.props.conversationId, convoUserId: this.props.convoUserId, topicId : this.props.topicId, topicName : this.props.topicName };
        this.props.startConversation(availableConversationData);
    }

    return (
        <li class="available-conversation-item" conversationId={this.props.conversationId} convoUserId={this.props.convoUserId} index={this.props.index}>
            <h3 class="topic" topicId={this.props.topicId}>{this.props.topicName}</h3>
            <p class="viewpoint">{this.props.viewpoint}</p>
            <button class="start-conversation-button" onClick={onClick()}>Start Conversation</button>
        </li>
    );
}