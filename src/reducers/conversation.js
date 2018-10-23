
// Actions
import {DISPLAY_INITIAL_CONNECTION, DISPLAY_MESSAGE, UPDATE_CONVO_DATA} from '../actions/conversation';

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
    conversationFinished : false
}

export default function conversationReducer(state=initialState, action) {
    if (action.type === DISPLAY_INITIAL_CONNECTION) {
        return Object.assign({}, state, {
            conversationStarted : true,
            loading : false,
            error : false
        });
    } else if (action.type === DISPLAY_MESSAGE) {
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
    }
    return state;
}