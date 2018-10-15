
import React from 'react';
import {BrowserRouter as Link} from 'react-router-dom';
import {reduxForm, Field} from 'redux-form';
import PropTypes from 'prop-types'

function Header() {
    return (
        <header role="header">
            <h1>Our Two Cents</h1>
            <Link to="./main-page.html">Home (icon link)</Link>
            <Link to="./landing-page.html">About Our Site (icon link)</Link>
        </header>
    );
}

class CreateConversationPage extends React.component {
    componentDidMount() {
        // this.props.dispatch(make a getTopics fetch(GET))
        // establishing topicList
    }

    onClickTopic(topicId) {
        console.log(topicId);
        const topicName = topicList[topicId];
        // this.props.dispatch(action rendering CreateConversationForm with topicId topicName, topicChosen=true)
    }

    render() {
        let createConversationForm;
        let waitingSection;
        if (conversationCreated && topicChosen) {
            waitingSection = <WaitingSection {...topicChosenData} />;
        } else if (topicChosen) {
            createConversationForm = <CreateConversationForm {...topicChosenData} />;
        }
        
        return (
            <div class="container">
                <ChooseTopicSection {...topicList} onClickTopic={this.onClickTopic} />
                {createConversationForm}
                {waitingSection}
            </div>
        );
    }
}

CreateConversationPage.PropTypes = {
    topicChosen : ProtoTypes.bool,
    conversationCreated : PropTypes.bool,
    topicChosenData : PropTypes.object,
    createConversationForm : PropTypes.object,
    waitingSection : PropTypes.object
}

function ChooseTopicSection(props) {
    return (
        <section class="choose-topic-section">
            <h2>Choose one of the many pre-made topics for discussion.</h2>
            <TopicList {...props} />
        </section>
    );
}

function TopicList(props) {
    const topicList = this.props.topicList.map(topic => {
        <li class="topic" topicId={props.topicId} onClick={props.onClickTopic(props.topicId)}>
            {topicName}
        </li>
    });
    return (
        <ul>
            {topicList}
        </ul>
    );
}

function CreateConversationSection(props) {
    return (
        <section class="viewpoint-and-submit-section">
        <h2>You choose {props.topic}</h2>
            <CreateConversationForm {...props} />
        </section>
    );
}

class CreateConversationForm extends React.Component {
    onSubmit(values) {
        console.log(values);
    }
    
    render() {
        return (
            <form onSubmit={this.props.handleSubmit(values)}>
                <label htmlFor="input-user-viewpoint">What is your stance on the topic?</label>
                <Field name="viewpoint" type="text" id="input-user-viewpoint" component="input" required />
                <button type="submit">Open Conversation</button>
            </form>
        );
    }
}

function WaitingSection(props) {
    return (
        <section class="waiting-for-other-person-section">
            <h3 class="waiting-text">Your conversation on {this.props.topicName} is visible. You'll be notified when someone connects.</h3>
            <button class="cancel-conversation-button">Cancel</button>
            <h3 class="success-text" hidden>Success! Your conversation on {this.props.topicName} is about to start.</h3>
        </section>
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
// This is decidedly not essential for functionality. After the 2nd person connects to the conversation, I had the 1st confirm they were at the keyboard, ready to begin. Decided it's not a necessity.
<h3 class="success-text" hidden>Success! Open your conversation on "Gun Control".</h3>
<button class="begin-conversation-button" hidden>Start Conversation</button>
(Accepted matching doesn't work yet, <a href="./conversation.html">Start Conversation</a>)
*/