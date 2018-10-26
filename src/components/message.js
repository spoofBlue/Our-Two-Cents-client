
import React from 'react';

export default function Message(props) {
    return (
        <p className="message"><span className={props.myMessage ? 'bold' : ''}>{props.username}:</span> {props.message}</p>
    );
}