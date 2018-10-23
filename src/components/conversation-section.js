
// Libraries
import React from 'react';
// import {Route} from 'react-router-dom';  // use this.props.history instead
import {connect} from 'react-redux';
import PropType from 'prop-types';

// Actions
import {getConversationData} from '../actions/conversation';

// Components
import ConversationForm from './conversation-form';

export class ConversationSection extends React.Component {
    componentDidMount() {
        this.props.dispatch(getConversationData(this.props.convoData));  // get conversationId from this.props.params.conversationId !!!
    }

    sendMessage(values) {
        console.log(`ran sendMessage. values=`, values);
        // this.props.dispatch();
    }

    exitConversation() {
        console.log(`ran exitConversation`);
        // this.props.dispatch();
    }

    render() {
        return (
            <section className="conversation-section">
                <h2>Your conversation with {this.props.otherUsername}: {this.props.topicName}</h2>
                <ConversationBoard messageList={this.props.messageList} conversationFinished={this.props.conversationFinished} />
                <ConversationForm />
                <button className="leave-conversation-button" onClick={() => this.exitConversation()}>Leave Conversation</button>{/**!!!! */}
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
    conversationFinished : PropType.bool
}


export function ConversationBoard(props) {
    console.log('props.messageList=', props.messageList);
    const board = props.messageList.map(message => (
        <Message {...message} />
    ));
    let conversationFinished;
    if (props.conversationFinished) {
        conversationFinished = <p className="conversation-finished-text">The other person has left. Click "Leave Conversation" to exit.</p>
    }
    return (
        <div className="container conversation-board">
            {board}
            {conversationFinished}
        </div>
    );
}

export function Message(props) {
    return (
        <p className="message" user={props.userId}>{this.props.username}: {this.props.message}</p>
    );
}

const mapStateToProps = state => ({
    convoData : {
        conversationId : state.convo.convoData.conversationId,
        yourUsername : state.convo.convoData.yourUsername,
        otherUsername : state.convo.convoData.otherUsername,
        topicName : state.convo.convoData.topicName,
        topicId : state.convo.convoData.topicId
    },
    messageList : state.convo.messageList,
    conversationStarted : state.convo.conversationstarted,
    conversationFinished : state.convo.conversationFinished
});

export default connect(mapStateToProps)(ConversationSection);