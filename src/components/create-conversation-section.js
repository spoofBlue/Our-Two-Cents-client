
// Libraries
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import {getTopicList, processTopicChosen, cancelViewpointSection, processViewpointChosen, cancelWaitingSection, cancelConversationRevertComponent} from '../actions/create-convo';

// Components
import ChooseTopicSection from './choose-topic-section';
import ChooseViewpointSection from './create-viewpoint-section';
import WaitingSection from './waiting-section';

export class CreateConversationSection extends React.Component {
    componentDidMount() {
        console.log(`component did mount`);
        this.props.dispatch(getTopicList())
    }

    componentWillUnmount() {
        if (this.props.topicChosenOnly) {
            this.props.dispatch(cancelViewpointSection());
        } else if (this.props.conversationCreated) {
            this.props.dispatch(cancelConversationRevertComponent(this.props.createConvoData));
        }
    }

    onClickTopic(topicChosenData) {
        this.props.dispatch(processTopicChosen(topicChosenData));
    }

    onCancelViewpointSection() {
        this.props.dispatch(cancelViewpointSection());
    }

    onViewpointSubmit(viewpointChosenData) {
        const newCreateConvoData = {...this.props.createConvoData, ...viewpointChosenData, currentuser : this.props.currentuser};
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
    createConvoData : PropTypes.object,
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