
// Libraries
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Col from 'react-bootstrap/lib/Col';

import './available-conversation.css';

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

    function getInitials(name) {
        console.log(`${name.substring(0,1)}${name.substring(name.length -2, name.length - 1)}`);
        return `${name.substring(0,1)}${name.substring(name.length -2, name.length - 1)}`;
    }

    return (
        <Col sm={6} md={3}>
            <div className="available-conversation">
                <div className="AC-topic-container">{props.topicName}</div>
                <div className="AC-hostUsername-viewpoint-container">
                    <div className="AC-hostUsername">{getInitials(props.hostUsername)}</div>
                    <p className="AC-hostViewpoint-short">{props.hostViewpoint}</p>
                    {/*<input type="image" id="AC-hostViewpoint-expand-icon" src="./images/next.png" alt=""/>*/}
                </div>
                <div className="AC-button-container">
                    <Button bsStyle="primary" className="AC-start-conversation-button" onClick={onClick}>Start Conversation</Button>
                </div>
            </div>
        </Col>
    );
}

/*
 <Modal.Dialog>
    <Modal.Header>
        <Modal.Title className="available-conversation-topic">{props.topicName}</Modal.Title>
    </Modal.Header> 
    <Modal.Body>
        <p className="available-conversation-viewpoint">{props.hostViewpoint}</p>
        <Button bsStyle="primary" className="start-conversation-button" onClick={onClick}>Start Conversation</Button>
    </Modal.Body>
</Modal.Dialog>



*/

