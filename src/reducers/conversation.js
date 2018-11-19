
// Actions
import {DISPLAY_CONVERSATION_STARTED, DISPLAY_MESSAGE_LIST, UPDATE_CONVERSATION_DATA, UPDATE_HANDLER, DISPLAY_CONVERSATION_FINISHED, 
    DISPLAY_CONVERSATION_LEAVING, RESET_COMPONENT} from '../actions/conversation';

// Reducer

const initialState = {
    conversationData : {
        conversationId : "",
        channelURL : "",
        handler : null,
        otherPersonId : "",
        otherPersonUsername : "",
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
    } else if (action.type === UPDATE_CONVERSATION_DATA) {
        return Object.assign({}, state, {
            conversationData : action.conversationData,
            loading : false,
            error : false
        });
    } else if (action.type === UPDATE_HANDLER) {
        return Object.assign({}, state, {
            conversationData : action.handler,
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
            conversationData : {},
            messageList : [],
            loading : false,
            error : false
        });
    }
    return state;
}

