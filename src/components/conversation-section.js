
// Libraries
import React from 'react';
import {Redirect} from 'react-router-dom';  // use this.props.history instead
import {connect} from 'react-redux';
import PropType from 'prop-types';

// Actions
import {enterConversation, processSubmittedMessage, handleChannelEvent, renderMessageList, exitConversation, resetComponent} from '../actions/conversation';
import {getSendBirdChannel, getMessageList, getChannelEventHandler} from '../actions/sendbird';
import {sendbirdInstance} from '../components/App';

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
        console.log(`ran sendMessage. message=`, message);
        this.props.dispatch(processSubmittedMessage(message, this.props.conversationData));
    }

    exitConvo() {
        this.props.dispatch(exitConversation(this.props.conversationData));
    }

    chatElement() {
        //let groupChannel = getSendBirdChannel(channelURL);
        this.props.dispatch(handleChannelEvent(this.props.conversationData.channelURL, this.props.conversationData.conversatonId, this.props.currentUser.userId));
    }

    render() {
        console.log(`conversation-section. this.props=`, this.props);
        if (!this.props.loggedIn) {
            return <Redirect to="/login" />;
        }
        if (this.props.leaveConversation) {
            return (<Redirect to='/home' />);
        }
        let conversationElement;
        if (this.props.conversationStarted) {
            conversationElement = this.chatElement();
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
            channelURL : state.convo.conversationData.channelURL,
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