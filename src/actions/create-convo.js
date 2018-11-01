
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

import {TOPIC_LIST} from '../data/topic-list';

export const DISPLAY_LOADING = 'DISPLAY_LOADING';
export const displayLoading = () => ({
    type : DISPLAY_LOADING
});

export const DISPLAY_TOPIC_LIST = 'DISPLAY_TOPIC_LIST';
export const displayTopicList = (topicList) => ({
    type : DISPLAY_TOPIC_LIST,
    topicList
});

export const UPDATE_CREATE_CONVO_DATA = 'UPDATE_CREATE_CONVO_DATA';
export const updateCreateConvoData = (createConvoData) => ({
    type : UPDATE_CREATE_CONVO_DATA,
    createConvoData
});

export const DISPLAY_VIEWPOINT = 'DISPLAY_VIEWPOINT';
export const displayViewpoint = () => ({
    type : DISPLAY_VIEWPOINT,
});

export const REMOVE_VIEWPOINT = 'REMOVE_VIEWPOINT';
export const removeViewpoint = () => ({
    type : REMOVE_VIEWPOINT,
});

export const DISPLAY_WAITING_SECTION = 'DISPLAY_WAITING_SECTION';
export const displayWaitingSection = () => ({
    type : DISPLAY_WAITING_SECTION,
});

export const REMOVE_WAITING_SECTION = 'REMOVE_WAITING_SECTION';
export const removeWaitingSection = () => ({
    type : REMOVE_WAITING_SECTION
});

export const DISPLAY_ERROR = `DISPLAY_ERROR`;
export const displayError = status => ({
    type : DISPLAY_ERROR,
    error : status.error
});

export const RESET_COMPONENT = 'RESET_COMPONENT';
export const resetComponent = () => ({
    type : RESET_COMPONENT
});

// currently we just have a stored file with a topic list.  May store on server, but leaving initial, at least for now.
export const getTopicList = () => dispatch => {
    dispatch(displayLoading());
    const topicList = TOPIC_LIST;
    dispatch(displayTopicList(topicList));
};

export const processTopicChosen = (createConvoData) => dispatch => {
    // when user selects a topic with an onClick event, fills createConvoData with a topicId and topicName. Variable altered to show the Viewpoint Section
    dispatch(updateCreateConvoData(createConvoData));
    dispatch(removeWaitingSection());
    dispatch(displayViewpoint());
};

export const cancelViewpointSection = () => dispatch => {
    // Variable altered to remove the Viewpoint Section, also 
    const newCreateConvoData = {}
    dispatch(updateCreateConvoData(newCreateConvoData));
    dispatch(removeViewpoint());
};

export const processViewpointChosen = (createConvoData) => dispatch => {
    // When the user does a submit event in the Viewpoint section, posts the availableConversation onto the server with createConvoData, shows the Waiting Section component.
    console.log(`ran postAvailableConversation. createConvoData=`, createConvoData);
    dispatch(displayLoading());
    dispatch(createAvailableConversation(createConvoData));
};

export const createAvailableConversation = (createConvoData) => dispatch => {
    // The specific POST request to availableConversations database.
    // Will also receive a response giving us a conversationId to add into createConvoData.
    console.log(`createAvailableConversation. createConvoData=`, createConvoData);
    dispatch(displayLoading());
    fetch(`${API_BASE_URL}/availableConversations`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            hostUserId : createConvoData.hostUserId,
            hostUsername : createConvoData.hostUsername,
            hostViewpoint : createConvoData.hostViewpoint,
            topicId : createConvoData.topicId,
            topicName : createConvoData.topicName
        })
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
        console.log(`createAvailableConversation. res=`, res);
        createConvoData.conversationId = res.conversationId;
        dispatch(updateCreateConvoData(createConvoData));
        dispatch(removeViewpoint());
        dispatch(displayWaitingSection());
    })
    .catch(err => {
        console.log(err);
        displayError(err);
    });
};

export const cancelWaitingSection = (createConvoData) => dispatch => {
    // Handles event of user cancelling the conversation through an onClick event, or unmounting the component while the Waiting Section is up.
    dispatch(displayLoading());
    dispatch(cancelAvailableConversation(createConvoData))
    .then(() => {
        const topicOnlyData = {
            topicId : createConvoData.topicId,
            topicName : createConvoData.topicName
        };
        dispatch(updateCreateConvoData(topicOnlyData));
        dispatch(removeWaitingSection());
        dispatch(displayViewpoint());
    })
    .catch((err) => {
        console.log(`cancelWaitingSection. err=`,err);
        dispatch(resetComponent());
    });
};

export const cancelConversationResetComponent = (createConvoData) => dispatch => {
    dispatch(cancelAvailableConversation(createConvoData));
    dispatch(resetComponent());
}

export const cancelAvailableConversation = (createConvoData) => dispatch => {
    // Make a fetch(POST) request with createConvoData.conversationId to remove this available conversation from databse/ others visibility.
    return fetch(`${API_BASE_URL}/availableConversations/${createConvoData.conversationId}`, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            conversationId : createConvoData.conversationId,
            status : 'cancelled'
        })
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
        console.log(`cancelAvailableConversation. res=`, res)
        return;
    })
    .catch(`cancelAvailableConversation. err=`, err => {
        console.log(err);
        return displayError(err);
    });
};