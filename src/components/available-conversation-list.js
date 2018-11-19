
// Libraries
import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Grid, Row} from 'react-bootstrap';

// Actions
import {prepareConversation, getAvailableConversationsList, resetComponent} from '../actions/join-convo'

// Components
import AvailableConversation from './available-conversation';

export class AvailableConversationList extends React.Component {
    componentDidMount() {
        this.props.dispatch(getAvailableConversationsList());
    }

    componentWillUnmount() {
        this.props.dispatch(resetComponent());
    }

    startConversation(availableConversationData) {
        console.log(`start conversation. availableConversationData= `, availableConversationData);
        // Opt to just get all the relevant convo information from the server response. Still using conversationId for server contact.
        this.props.dispatch(prepareConversation(availableConversationData.conversationId, this.props.currentUser.userId, this.props.currentUser.username));
    }
    
    render() {
        if (!this.props.loggedIn) {
            return <Redirect to="/login" />;
        }
        if (this.props.conversationStarted) {
            const route = `/conversation/${this.props.conversationRoute}`;
            return (<Redirect to={route} />);
        }
        console.log(`render() this.props= `, this.props);
        const conversationList = this.props.conversationList.map((convo, index) => {
            if (convo.hostUserId === this.props.currentUser.userId) {
                return null;
            }
            return (<AvailableConversation {...convo} key={index} startConversation={availableConversationData => this.startConversation(availableConversationData)} />);
        });
        let error;
        let loading;
        if (this.props.error) {
            error = (<p className="error">{this.props.error}</p>);
        }
        if (this.props.loading === true) {
            loading = <div>Loading...</div>
        }

        return (
            <Grid>
                <Row className="show-grid">
                    {error}
                    {loading}
                        {conversationList}
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    console.log(`in mapStateToProps. state = `, state);
    console.log(`in mapStateToProps. state.joinConvo = `, state.joinconvo);
    return ({
        currentUser : state.auth.currentUser,
        loggedIn: state.auth.currentUser !== null,
        conversationList : state.joinconvo.conversationList,
        conversationRoute : state.joinconvo.conversationRoute,
        conversationStarted : state.joinconvo.conversationStarted,
        loading : state.joinconvo.loading,
        error : state.joinconvo.error
    });
};

export default connect(mapStateToProps)(AvailableConversationList);