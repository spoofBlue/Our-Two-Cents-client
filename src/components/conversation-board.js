
import React from 'react';

import Message from './message';

export default function ConversationBoard(props) {
    const board = props.messageList.map((message, index) => {
        props.currentUser.userId === message.sender.userId ? message.myMessage = true : message.myMessage = false;
        return (<Message message={message} key={index} />);
    });
    let conversationStartedText;
    let conversationFinishedText;
    if (props.conversationStarted) {
        conversationStartedText = (<p className="conversation-started-text">You are now connected with {props.conversationData.otherPersonUsername}.</p>);
    }
    if (props.conversationFinished) {
        conversationFinishedText = (<p className="conversation-finished-text"> {props.conversationData.otherPersonUsername} has left the conversation. Click "Leave Conversation" to exit.</p>);
    }
    return (
        <div className="container conversation-board">
            {conversationStartedText}
            {board}
            {conversationFinishedText}
        </div>
    );
}