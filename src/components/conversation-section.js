
// Libraries
import React from 'react';
import {Redirect} from 'react-router-dom';  // use this.props.history instead
import {connect} from 'react-redux';
import PropType from 'prop-types';

// Actions
import {enterConversation, processSubmittedMessage, exitConversation, resetComponent} from '../actions/conversation';

// Components
import ConversationForm from './conversation-form';
import ConversationBoard from './conversation-board';

export class ConversationSection extends React.Component {
    componentDidMount() {
        this.props.dispatch(enterConversation(this.props.match.params.conversationId, this.props.currentUser.userId, this.props.currentUser.username));
    }

    componentWillUnmount() {
        this.props.dispatch(resetComponent());
    }

    sendMessage(message) {
        message.userId = this.props.userId;
        message.username = this.props.username;
        console.log(`ran sendMessage. message=`, message);
        this.props.dispatch(processSubmittedMessage(this.props.conversationData.conversationId, this.props.messageList, message));
    }

    exitConvo() {
        this.props.dispatch(exitConversation(this.props.conversationData));
    }

    render() {
        if (!this.props.loggedIn) {
            return <Redirect to="/login" />;
        }
        console.log(`conversation-section. this.props.conversationData=`, this.props.conversationData);
        if (this.props.leaveConversation) {
            return (<Redirect to='/home' />);
        }
        return (
            <section className="conversation-section">
                <h2>Your conversation with {this.props.conversationData.otherPersonUsername}: {this.props.conversationData.topicName}</h2>
                <ConversationBoard {...this.props} />
                <ConversationForm sendMessage={message => this.sendMessage(message)} />
                <button className="leave-conversation-button" onClick={() => this.exitConvo()}>Leave Conversation</button>
            </section>
        );
    };
}

ConversationSection.propType = {
    currentUser : PropType.object.isRequired,
    conversationData : {
        conversationId : PropType.string,
        otherPersonId : PropType.string,
        otherPersonUsername : PropType.string,
        topicName : PropType.string,
        topicId : PropType.string
    },
    messageList : PropType.array,
    conversationStarted : PropType.bool.isRequired,
    conversationFinished : PropType.bool.isRequired,
    leaveConversation : PropType.bool.isRequired
}

const mapStateToProps = state => {
    console.log(state.convo);
    return {
        currentUser : state.auth.currentUser,
        loggedIn: state.auth.currentUser !== null,
        conversationData : {
            conversationId : state.convo.conversationData.conversationId,
            otherPersonUserId : state.convo.conversationData.otherPersonUserId,
            otherPersonUsername : state.convo.conversationData.otherPersonUsername,
            topicId : state.convo.conversationData.topicId,
            topicName : state.convo.conversationData.topicName
        },
        messageList : state.convo.messageList,
        conversationStarted : state.convo.conversationStarted,
        conversationFinished : state.convo.conversationFinished,
        leaveConversation : state.convo.leaveConversation
    };
};

export default connect(mapStateToProps)(ConversationSection);