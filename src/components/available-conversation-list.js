
// Libraries
import React from 'react';
import {Link, Redirect} from 'react-router-dom';

// Actions
import {prepareConversation, getAvailableConversationsList} from '../actions/root'

// Components
import ErrorNotification from './error-notification';

export class AvailableConversationList extends React.Component {
    componentDidMount() {
        this.props.dispatch(getAvailableConversationsList());
    }

    startConversation(availableConversationData) {
        console.log(this.props);  // availableConversationData has conversationId, userHostId, topicId, topicName
        this.props.disptach(prepareConversation(availableConversationData));
    }
    
    render() {
        if (this.props.route !== `/home`) {
            return (<Redirect to={this.props.route} />);
        }
        const conversationList = this.props.availableConversationList.map(convo => 
            <AvailableConversation {...convo} onClick={availableConversationData => this.startConversation(availableConversationData)} />
        );
        
        let error;
        let loading;
        if (this.props.error) {
            error = <ErrorNotification {...this.props.error} />;
        }
        if (this.props.loading === true) {
            loading = <div>Loading...</div>
        }

        return (
            <div class="container">
                {error}
                {loading}
                <ul>
                    {conversationList}
                </ul>
            </div>
        );
    }
}

export function AvailableConvesation(props) {
    function onClick() {
        const openedAvailableConversationData = {conversationId : this.props.conversationId, userHostId: this.props.userHostId, topicId : this.props.topicId, topicName : this.props.topicName };
        this.props.startConversation(openedAvailableConversationData);
    }

    return (
        <li class="available-conversation-item" conversationId={this.props.conversationId} userHostId={this.props.userHostId} index={this.props.index}>
            <h3 class="topic" topicId={this.props.topicId}>{this.props.topicName}</h3>
            <p class="viewpoint">{this.props.viewpoint}</p>
            <button class="start-conversation-button" onClick={onClick()}>Start Conversation</button>
        </li>
    );
}

/*
// This is decidedly not essential for functionality. Basically the section would have the 2nd person who joined (you) to wait for the 1st person to confirm they're nearby. Again, not a necessity.
function WaitingSection(props) {
    return (
        <section class="waiting-for-other-person-section">
            <h3 class="waiting-text">Notifying the other person to begin your conversation on {props.topicName}. Your chat will open shortly.</h3>
            <button class="cancel-conversation-button" onClick={props.onCancelWaitingSection}>Cancel</button>
        </section>
    );
}
*/