
import React from 'react';
import {Route} from 'react-router-dom';  // use this.props.history instead
import {reduxForm, Field} from 'redux-form';

function ConversationSection(props) {
    function sendMessage(values) {
        /** Do this here or in ConversationBoard? this.props.dispatch either way. */
    }
    return (
        <section class="conversation-section">
            <h2>Your conversation with {props.otherUsername}: {props.topicName}</h2>
            <ConversationBoard />
            <ConversationForm />
            <ExitConversation />
        </section>
    );
}

ConversationSection.PropType = {
    conversationId : PropType.string.isRequired,
    yourUsername : PropType.string.isRequired,
    otherUsername : PropType.string.isRequired,
    topicName : PropType.string.isRequired,
    topicId : PropType.string.isRequired,
    messageList : PropType.array.isRequired,
    conversationFinished : PropType.bool
}

class ConversationBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    sendMessage(values) {
        return "";  /** Do this here or in Section? this.props.dispatch either way. */
    }

    exitConversation() {
        this.props.history() /**redirect route through history here */
    }

    render() {
        const board = this.props.messageList.map(message => {
            <Message {...message} />
        });
        let conversationFinished;
        if (this.props.conversationFinished) {
            conversationFinished = <ConversationFinished />
        }
        return (
            <div class="container conversation-board">
                {board}
                {conversationFinished}
            </div>
        );
    }
}

function Message(props) {
    return (
        <p class="message" user={props.userId}>{this.props.username}: {this.props.message}</p>
    );
}

function ConversationFinished() {
    return (
        <p class="conversation-finished-text">The other person has left. Click "Leave Conversation" to exit.</p>
    );
}

class ConversationForm extends React.Component {
    render() {
        return (
            <form class="conversation-form" onSubmit={values=>this.props.sendMessage(values)}>{/**!!!! */}
                <label htmlFor="messanger">Start your conversation here! Remember our guidelines on keeping conversations civil and informative :)</label>
                <Field name="messanger" type="text" placeholder="Message..." value="" component="input" /> {/**!!!! value component*/}
                <button type="submit" class="submit-message-button">Send</button>
            </form>
        );
    }
}

function ExitConversation(props) {
    return (
        <div class="container exit-conversation-section">
            <button class="leave-conversation-button" onClick={props.exitConversation()}>Leave Conversation</button>{/**!!!! */}
        </div>
    );
}