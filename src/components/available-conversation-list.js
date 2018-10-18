
// Libraries
import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

// Actions
import {prepareConversation, getAvailableConversationsList} from '../actions/root'

// Components
import AvailableConversation from './available-conversation';
import ErrorNotification from './error-notification';

export class AvailableConversationList extends React.Component {
    componentDidMount() {
        this.props.dispatch(getAvailableConversationsList());
    }

    startConversation(availableConversationData) {
        console.log(this.props);  // availableConversationData has conversationId, convoUserId, topicId, topicName
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

const mapStateToProps = state => ({
    route : state.route,
    conversationList : state.conversationList,
    conversationData : state.conversationData,
    userId : state.userId,
    loading : state.loading,
    error : state.error
});

export default connect(mapStateToProps)(AvailableConversationList);