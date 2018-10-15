
import React from 'react';
import {BrowserRouter as Link} from 'react-router-dom';

function Header() {
    return (
        <header role="header">
            <h1>Our Two Cents</h1>
            <Link to="./main-page.html">Home (icon link)</Link>
            <Link to="./landing-page.html">About Our Site (icon link)</Link>
        </header>
    );
}

function AvailableConversationSection() {
    return (
        <section class="available-conversation-section">
            <h2>Pick a topic with a differing viewpoint, or <Link to="./create-conversation.html">click here to start a topic...</Link></h2>
            <AvailableConversationList />
            {/*<WaitingSectoin onClick={this.onCancelWaitingSection}/>  If using this waiting section, changing this component to React component, WaitingSection would depend on prop activatoin.*/}
        </section>
    );
}

class AvailableConversationList extends React.Component {
    componentDidMount() {
        // this.props.dispatch(to a getAvailableConversations fetch(GET))
        // establishing conversationList
    }

    startConversation(openedAvailableConversationData) {
        console.log(this.props);
        const {conversatoinId, userHostId, topicId, topicName} = openedAvailableConversationData;
        // this.props.disptach(make a fetch(POST) the conversation has found a 2nd member)
        // Conversation component
    }
    
    render() {
        const conversationList = this.props.availableConversations.map(convo => <AvailableConversation {...convo} onClick={openedAvailableConversationData => this.startConversation(openedAvailableConversationData)} />);
        let error;
        if (this.props.error) {
            error = <Error {...this.props.error} />;
        }
        return (
            <ul>
                {error}
                {conversationList}
            </ul>
        );
    }
}

function AvailableConvesation(props) {
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

function Error(props) {
    return (
        <div class="error-notification">
            <p>{props.error.text}</p>
        </div>
    );
}

function Footer() {
    return (
        <footer role="footer">
            <ul>
                <li><Link to="./landing-page.html">About Our Site</Link></li>
                <li>Contact Us : dummy-email@email.com</li>
            </ul>
        </footer>
    );
}


/*
// This is decidedly not essential for functionality. Basically the section would have the 2nd person who joined to wait for the 1st person to confirm their nearby. Again, not a necessity.
function WaitingSection(props) {
    return (
        <section class="waiting-for-other-person-section">
            <h3 class="waiting-text">Notifying the other person to begin your conversation on {props.topicName}. Your chat will open shortly.</h3>
            <button class="cancel-conversation-button" onClick={props.onCancelWaitingSection}>Cancel</button>
        </section>
    );
}
*/