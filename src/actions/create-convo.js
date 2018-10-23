
//import {API_BASE_URL} from '../config';
//import {normalizeResponseErrors} from './utils';

// Temporary Globals replacing fetched data.

const TEMP_TOPIC_LIST = {
    topicList : [
        {topicId : '1', topicName : 'Abortion'},
        {topicId : '2', topicName : 'Gun Control'},
        {topicId : '3', topicName : 'Immigration Reform'},
        {topicId : '4', topicName : 'Same-sex Marriage'},
        {topicId : '5', topicName : 'Voter ID Registration'},
        {topicId : '6', topicName : 'Equal Pay Regulations'},
        {topicId : '7', topicName : 'Climate Change'},
        {topicId : '8', topicName : 'Armed Teachers'},
    ]
};

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

export const getTopicList = () => dispatch => {
    console.log(`ran getTopicList`);
    dispatch(displayLoading());
    // Make a fetch(GET) request for all the topics in our server.
    // Failed get: we send an error, we are unable to load topics at this time. Please login and try again.
    const topicList = TEMP_TOPIC_LIST.topicList;
    dispatch(displayTopicList(topicList));
};

export const processTopicChosen = (createConvoData) => dispatch => {
    dispatch(updateCreateConvoData(createConvoData));
    dispatch(removeWaitingSection());
    dispatch(displayViewpoint());
};

export const cancelViewpointSection = () => dispatch => {
    const newCreateConvoData = {}
    dispatch(updateCreateConvoData(newCreateConvoData));
    dispatch(removeViewpoint());
};

export const processViewpointChosen = (createConvoData) => dispatch => {
    console.log(`ran postAvailableConversation. createConvoData=`, createConvoData);
    dispatch(displayLoading());
    dispatch(createAvailableConversation(createConvoData));
    dispatch(removeViewpoint());
    dispatch(displayWaitingSection());
};

export const createAvailableConversation = (createConvoData) => dispatch => {
    // Make a fetch(POST) request with createConvoData to make this conversation available for others to see.
    // Will also receive a response giving us a conversationId to roll into createConvoData
    createConvoData.conversationId = "ABCDE";
    // successful post: we display the waiting section in app.
    // Failed post: we send an error, something went wrong.
    dispatch(updateCreateConvoData(createConvoData));
};

export const cancelWaitingSection = (createConvoData) => dispatch => {
    dispatch(displayLoading());
    dispatch(cancelAvailableConversation(createConvoData));
    const topicOnlyData = {
        topicId : createConvoData.topicId,
        topicName : createConvoData.topicName
    };
    dispatch(updateCreateConvoData(topicOnlyData));
    dispatch(removeWaitingSection());
    dispatch(displayViewpoint());
};

export const cancelConversationRevertComponent = (createConvoData) => dispatch => {
    dispatch(cancelAvailableConversation(createConvoData));
    dispatch(removeWaitingSection());
}

export const cancelAvailableConversation = (createConvoData) => dispatch => {
    // Make a fetch(POST) request with createConvoData.conversationId to remove this conversation from others visibility.
};