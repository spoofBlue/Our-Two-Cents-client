
// Actions
import {DISPLAY_LOADING, DISPLAY_TOPIC_LIST, UPDATE_CREATE_CONVO_DATA, DISPLAY_VIEWPOINT, 
    REMOVE_VIEWPOINT, DISPLAY_WAITING_SECTION, REMOVE_WAITING_SECTION, 
    DISPLAY_ERROR, RESET_COMPONENT} from '../actions/create-convo';
import {TOPIC_LIST} from '../data/topic-list';

// Initial
const initialState = {
    topicList : TOPIC_LIST,
    topicChosenData : {},
    createConvoData : {},
    topicChosenOnly : false,
    conversationCreated : false,
    loading : false,
    error : null
};

// Reducer
export default function createConvoReducer(state=initialState, action) {
    if (action.type === DISPLAY_LOADING) {
        return Object.assign({}, state, {
           loading : true 
        });
    }
    if (action.type === DISPLAY_TOPIC_LIST) {
        return Object.assign({}, state, {
           topicList : action.topicList,
           loading : false ,
           error : null
        });
    } else if (action.type === UPDATE_CREATE_CONVO_DATA) {
        return Object.assign({}, state, {
            createConvoData : action.createConvoData,
        });
    } else if (action.type === DISPLAY_VIEWPOINT) {
        return Object.assign({}, state, {
           topicChosenOnly : true,
           loading : false ,
           error : null
        });
    } else if (action.type === REMOVE_VIEWPOINT) {
        return Object.assign({}, state, {
            topicChosenOnly : false,
           loading : false ,
           error : null
        });
    } else if (action.type === DISPLAY_WAITING_SECTION) {
        return Object.assign({}, state, {
            conversationCreated : true,
            loading : false ,
            error : null
        });
    } else if (action.type === REMOVE_WAITING_SECTION) {
        return Object.assign({}, state, {
            conversationCreated : false,
            loading : false,
            error : null
        });
    } else if (action.type === RESET_COMPONENT) {
        return Object.assign({}, initialState);
    } else if (action.type === DISPLAY_ERROR) {
        return Object.assign({}, state, {
            loading : false,
            error : action.error
        });
    }
    return state;
}