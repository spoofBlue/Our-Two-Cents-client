
// Actions
import {DISPLAY_CONVERSATION_STARTED, DISPLAY_MESSAGE_LIST, UPDATE_CONVO_DATA, DISPLAY_CONVERSATION_FINISHED, DISPLAY_CONVERSATION_LEAVING, RESET_COMPONENT} from '../actions/conversation';

// Reducer

const initialState = {
    convoData : {
        conversationId : "",
        yourUsername : "",
        otherUsername : "",
        topicName : "",
        topicId : "",
    },
    messageList : [],
    conversationStarted : false,
    conversationFinished : false,
    leaveConversation : false
}

export default function conversationReducer(state=initialState, action) {
    if (action.type === DISPLAY_CONVERSATION_STARTED) {
        return Object.assign({}, state, {
            conversationStarted : true,
            loading : false,
            error : false
        });
    } else if (action.type === DISPLAY_MESSAGE_LIST) {
        return Object.assign({}, state, {
            messageList : action.messageList,
            loading : false,
            error : false
        });
    } else if (action.type === UPDATE_CONVO_DATA) {
        return Object.assign({}, state, {
            convoData : action.convoData,
            loading : false,
            error : false
        });
    } else if (action.type === DISPLAY_CONVERSATION_LEAVING) {
        return Object.assign({}, state, {
            leaveConversation : true,
            loading : false,
            error : false
        });
    } else if (action.type === DISPLAY_CONVERSATION_FINISHED) {
        return Object.assign({}, state, {
            conversationFinished : true,
            loading : false,
            error : false
        });
    } else if (action.type === RESET_COMPONENT) {
        return Object.assign({}, state, {
            conversationStarted : false,
            conversationFinished : false,
            leaveConversation : false,
            convoData : {},
            messageList : [],
            loading : false,
            error : false
        });
    }
    return state;
}

