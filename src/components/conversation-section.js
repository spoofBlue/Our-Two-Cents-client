
// Libraries
import React from 'react';
import { Redirect } from 'react-router-dom';  // !!!! use this.props.history instead?
import { connect } from 'react-redux';
import PropType from 'prop-types';
import "./conversation-section.css";

// Actions
import {
    enterConversation, processSubmittedMessage, exitConversation, leaveConversation, resetComponent
} from '../actions/conversation';

// Components
import ConversationForm from './conversation-form';
import ConversationBoard from './conversation-board';

export class ConversationSection extends React.Component {
    componentDidMount() {
        if (this.props.match.params.conversationId && this.props.currentUser && this.props.currentUser.userId) {
            this.props.dispatch(enterConversation(this.props.match.params.conversationId, this.props.currentUser.userId, this.props.messageList));
        } else {
            this.props.dispatch(leaveConversation());
        }
    }

    componentWillUnmount() {
        this.props.dispatch(resetComponent());
    }

    sendMessage(message) {
        console.log(`ran sendMessage. message=`, message);
        this.props.dispatch(processSubmittedMessage(message, this.props.conversationData, this.props.messageList));
    }

    exitConvo() {
        this.props.dispatch(exitConversation(this.props.conversationData));
    }

    render() {
        console.log(`conversation-section . CURRENT PROPS=`, this.props);
        if (!this.props.loggedIn) {
            return <Redirect to='/login' />;
        }
        if (this.props.leaveConversation) {
            return <Redirect to='/home' />;
        }

        return (
            <section className="conversation-section sizeIsPageHeight">
                <h2>Your conversation with {this.props.conversationData.otherPersonUsername}: {this.props.conversationData.topicName}</h2>
                <ConversationBoard {...this.props} />
                <ConversationForm conversationFinished={this.props.conversationFinished} sendMessage={message => this.sendMessage(message)} />
                <button className="leave-conversation-button" onClick={() => this.exitConvo()}>Leave Conversation</button>
            </section>
        );
    };
}

ConversationSection.propType = {
    currentUser: PropType.object.isRequired,
    conversationData: {
        conversationId: PropType.string,
        handler: PropType.string,
        otherPersonId: PropType.string,
        otherPersonUsername: PropType.string,
        topicName: PropType.string,
        topicId: PropType.string
    },
    messageList: PropType.array,
    conversationStarted: PropType.bool.isRequired,
    conversationFinished: PropType.bool.isRequired,
    leaveConversation: PropType.bool.isRequired
}

const mapStateToProps = state => {
    console.log(`conversation-section. CURRENT STATE`, state.convo);
    return {
        currentUser: state.auth.currentUser,
        loggedIn: state.auth.currentUser !== null,
        conversationData: {
            conversationId: state.convo.conversationData.conversationId,
            channelURL: state.convo.conversationData.channelURL,
            handler: state.convo.conversationData.handler,
            otherPersonUserId: state.convo.conversationData.otherPersonUserId,
            otherPersonUsername: state.convo.conversationData.otherPersonUsername,
            topicId: state.convo.conversationData.topicId,
            topicName: state.convo.conversationData.topicName
        },
        messageList: state.convo.messageList,
        conversationStarted: state.convo.conversationStarted,
        conversationFinished: state.convo.conversationFinished,
        leaveConversation: state.convo.leaveConversation
    };
};

export default connect(mapStateToProps)(ConversationSection);