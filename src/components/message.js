
import React from 'react';

export default function Message(props) {
    return (
        <p className="message" user={props.message._sender.userId}>
            <span className={props.message.myMessage ? 'currentUserMessage' : ''}>{props.message.sender.nickname}:</span> {props.message.message}
        </p>
    );
}