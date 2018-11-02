
import React from 'react';

import Message from './message';

export default function ConversationBoard(props) {
    const board = props.messageList.map((message, index) => {
        if (props.username === message.username) {
            message.myMessage = true;
        }
        return(<Message {...message} key={index} />);
    });
    let conversationStartedText;
    let conversationFinishedText;
    if (props.conversationStarted) {
        conversationStartedText = (<p className="conversation-finished-text">You are now connected with {props.conversationData.otherPersonUsername}.</p>);
    }
    if (props.conversationFinished) {
        conversationFinishedText = (<p className="conversation-finished-text">The other person has left. Click "Leave Conversation" to exit.</p>);
    }
    return (
        <div className="container conversation-board">
            {conversationStartedText}
            {board}
            {conversationFinishedText}
        </div>
    );
}