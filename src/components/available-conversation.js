
// Libraries
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

import './available-conversation.css';

export default function AvailableConvesation(props) {
    function onClick(e) {
        e.preventDefault();
        const availableConversationData = {
            conversationId: props.conversationId,
            hostUserId: props.hostUserId,
            hostUsername: props.hostUsername,
            topicId: props.topicId,
            topicName: props.topicName
        };
        props.startConversation(availableConversationData);
    }

    function getInitials(name) {
        // Returns the initials of the user.  Assumes the name received is in the form "John S."
        console.log(`${name.substring(0, 1)}${name.substring(name.length - 2, name.length - 1)}`);
        return `${name.substring(0, 1)}${name.substring(name.length - 2, name.length - 1)}`;
        // !!! Can make this update... console.log(${name.substring(0,1)}${name.substring(name.indexOf(" "), name.indexOf(" ") + 1)});
        // return // ${name.substring(0,1)}${name.substring(name.indexOf(" "), name.indexOf(" ") + 1)};
    }

    const popoverHoverFocus = (
        <Popover id="popover-trigger-hover-focus" title={`${props.topicName} with ${props.hostUsername}`} className="">
            <strong>{props.hostViewpoint}</strong>
        </Popover>
    );

    return (
        <Col sm={6} md={4}>
            <div className="available-conversation">
                <div className="AC-topic">{props.topicName}</div>
                <div className="AC-hostUsername">{getInitials(props.hostUsername)}</div>
                <div className="AC-hostUsername-viewpoint-container">
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus}>
                        <div>
                            <p className="AC-hostViewpoint-short">{props.hostViewpoint}</p>
                            <p className="AC-hostViewpoint-expand-icon">></p>
                        </div>
                    </OverlayTrigger>
                </div>
                <div className="AC-button-container">
                    <Button bsStyle="primary" className="AC-start-conversation-button" onClick={onClick}>Start Conversation</Button>
                </div>
            </div>
        </Col>
    );
}