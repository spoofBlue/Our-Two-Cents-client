
// Libraries
import React from 'react';
import {Redirect} from 'react-router-dom';  // use this.props.history instead
import {connect} from 'react-redux';
import PropType from 'prop-types';

// Actions
import {initializeConversation, processSubmittedMessage, exitConversation, resetComponent} from '../actions/conversation';

// Components
import ConversationForm from './conversation-form';
import ConversationBoard from './conversation-board';

export class ConversationSection extends React.Component {
    componentDidMount() {
        this.props.dispatch(initializeConversation(this.props.userId,this.props.match.params.conversationId));
    }

    componentWillUnmount() {
        this.props.dispatch(resetComponent());
    }

    sendMessage(message) {
        message.userId = this.props.userId;
        message.username = this.props.username;
        console.log(`ran sendMessage. message=`, message);
        this.props.dispatch(processSubmittedMessage(this.props.convoData.conversationId, this.props.messageList, message));
    }

    exitConvo() {
        this.props.dispatch(exitConversation(this.props.convoData));
    }

    render() {
        if (this.props.leaveConversation) {
            return (<Redirect to='/home' />);
        }
        return (
            <section className="conversation-section">
                <h2>Your conversation with {this.props.convoData.otherPersonUsername}: {this.props.convoData.topicName}</h2>
                <ConversationBoard {...this.props} />
                <ConversationForm sendMessage={message => this.sendMessage(message)} />
                <button className="leave-conversation-button" onClick={() => this.exitConvo()}>Leave Conversation</button>
            </section>
        );
    };
}

ConversationSection.propType = {
    userId : PropType.string.isRequired,
    username : PropType.string.isRequired,
    convoData : {
        conversationId : PropType.string.isRequired,
        otherPersonId : PropType.string,
        otherPersonUsername : PropType.string,
        topicName : PropType.string,
        topicId : PropType.string
    },
    messageList : PropType.array,
    conversationStarted : PropType.bool,
    conversationFinished : PropType.bool,
    leaveConversation : PropType.bool
}

const mapStateToProps = state => {
    console.log(state.convo);
    return {
        userId : state.auth.userId,
        username : state.auth.username,
        convoData : {
            conversationId : state.convo.convoData.conversationId,
            otherPersonUserId : state.convo.convoData.otherPersonUserId,
            otherPersonUsername : state.convo.convoData.otherPersonUsername,
            topicId : state.convo.convoData.topicId,
            topicName : state.convo.convoData.topicName
        },
        messageList : state.convo.messageList,
        conversationStarted : state.convo.conversationStarted,
        conversationFinished : state.convo.conversationFinished,
        leaveConversation : state.convo.leaveConversation
    };
};

export default connect(mapStateToProps)(ConversationSection);