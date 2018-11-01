
// Libraries
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import {getTopicList, processTopicChosen, cancelViewpointSection, processViewpointChosen, cancelWaitingSection, cancelConversationResetComponent, resetComponent} from '../actions/create-convo';

// Components
import ChooseTopicSection from './choose-topic-section';
import ChooseViewpointSection from './choose-viewpoint-section';
import WaitingSection from './waiting-section';

export class CreateConversationSection extends React.Component {
    /*  Topiclist is currently client-side.  If I wish to make it server-side, this will be necessary.
    componentDidMount() {
        this.props.dispatch(getTopicList())
    }
    */

    componentWillUnmount() {
        if (this.props.conversationCreated) {
            this.props.dispatch(cancelConversationResetComponent(this.props.createConvoData));
        } else {
            this.props.dispatch(resetComponent);
        }
    }

    onClickTopic(topicChosenData) {
        this.props.dispatch(processTopicChosen(topicChosenData));
    }

    onCancelViewpointSection() {
        this.props.dispatch(cancelViewpointSection());
    }

    onViewpointSubmit(viewpointData) {
        const newCreateConvoData = {...this.props.createConvoData, hostViewpoint : viewpointData.viewpoint, 
            hostUserId : this.props.currentUser.userId, hostUsername : this.props.currentUser.username};
        this.props.dispatch(processViewpointChosen(newCreateConvoData));
    }

    onCancelWaitingSection() {
        this.props.dispatch(cancelWaitingSection(this.props.createConvoData));
    }

    render() {
        let chooseViewpointSec;
        let waitingSec;
        if (this.props.topicChosenOnly) {
            chooseViewpointSec = <ChooseViewpointSection createConvoData={this.props.createConvoData} 
                onViewpointSubmit={viewpointChosenData => this.onViewpointSubmit(viewpointChosenData)} 
                onCancelViewpointSection={() => this.onCancelViewpointSection()} />;
        } else if (this.props.conversationCreated) {
            waitingSec = <WaitingSection createConvoData={this.props.createConvoData} onCancelWaitingSection={() => this.onCancelWaitingSection()} />;
        }
        
        return (
            <div className="container">
                <ChooseTopicSection topicList={this.props.topicList} onClickTopic={topicData => this.onClickTopic(topicData)} />
                {chooseViewpointSec}
                {waitingSec}
            </div>
        );
    }
}

CreateConversationSection.propTypes = {
    topicList : PropTypes.array,
    createConvoData : PropTypes.object,  // topicId, topicName, hostUserId, hostUsername, hostViewpoint
    topicChosenOnly : PropTypes.bool,
    conversationCreated : PropTypes.bool,
    loading : PropTypes.bool,
    error : PropTypes.object,
}

const mapStateToProps = state => {
    console.log(`in mapStateToProps. state.createConvo= `, state.createconvo);
    return ({
        currentUser : state.auth.currentUser,
        topicList : state.createconvo.topicList,
        createConvoData : state.createconvo.createConvoData,
        topicChosenOnly : state.createconvo.topicChosenOnly,
        conversationCreated : state.createconvo.conversationCreated,
        loading : state.createconvo.loading,
        error : state.createconvo.error,
    })
};

export default connect(mapStateToProps)(CreateConversationSection);