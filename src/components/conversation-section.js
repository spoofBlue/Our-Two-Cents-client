
// Libraries
import React from 'react';
// import {Route} from 'react-router-dom';  // use this.props.history instead
import {connect} from 'react-redux';
import PropType from 'prop-types';

// Actions
import {initializeConversation, processSubmittedMessage, exitConversation} from '../actions/conversation';

// Components
import ConversationForm from './conversation-form';

export class ConversationSection extends React.Component {
    componentDidMount() {
        console.log("conversationId=", this.props.match.params.conversationId);
        this.props.dispatch(initializeConversation(this.props.match.params.conversationId));
    }

    sendMessage(message) {
        console.log(`ran sendMessage. message=`, message);
        this.props.dispatch(processSubmittedMessage(this.props.convoData.conversationId, this.props.messageList, message));
    }

    exitConvo() {
        console.log(`ran exitConversation`);
        this.props.dispatch(exitConversation(this.props.convoData));
    }

    render() {
        return (
            <section className="conversation-section">
                <h2>Your conversation with {this.props.otherUsername}: {this.props.topicName}</h2>
                <ConversationBoard {...this.props} />
                <ConversationForm sendMessage={message => this.sendMessage(message)} />
                <button className="leave-conversation-button" onClick={() => this.exitConvo()}>Leave Conversation</button>
            </section>
        );
    };
}

ConversationSection.propType = {
    convoData : {
        conversationId : PropType.string.isRequired,
        yourUsername : PropType.string,
        yourUserId : PropType.string,
        otherUsername : PropType.string,
        otherUserId : PropType.string,
        topicName : PropType.string,
        topicId : PropType.string
    },
    messageList : PropType.array,
    conversationStarted : PropType.bool,
    conversationFinished : PropType.bool,
    leaveConversation : PropType.bool
}


export function ConversationBoard(props) {
    console.log('props.messageList=', props.messageList);
    const board = props.messageList.map(message => (
        <Message {...message} />
    ));
    let conversationStartedText;
    let conversationFinishedText;
    if (props.conversationStarted) {
        conversationStartedText = (<p className="conversation-finished-text">You are now connected with {props.convoData.otherUsername}.</p>);
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

export function Message(props) {
    return (
        <p className="message" user={props.userId}>{this.props.username}: {this.props.message}</p>
    );
}

const mapStateToProps = state => {
    console.log(state.convo);
    return {
        convoData : {
            conversationId : state.convo.convoData.conversationId,
            yourUsername : state.convo.convoData.yourUsername,
            otherUsername : state.convo.convoData.otherUsername,
            topicName : state.convo.convoData.topicName,
            topicId : state.convo.convoData.topicId
        },
        messageList : state.convo.messageList,
        conversationStarted : state.convo.conversationStarted,
        conversationFinished : state.convo.conversationFinished,
        leaveConversation : state.convo.leaveConversation
    };
};

export default connect(mapStateToProps)(ConversationSection);