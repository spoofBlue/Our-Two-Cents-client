
// reducers/root

// Actions
import {DIPSLAY_LOADING, START_CONVERSATION, DISPLAY_ERROR, DISPLAY_AVAILABLE_CONVERSATION_LIST} from '../actions/root';

const initialState = {
    conversationList : [],
    userId : `99999`,
    loading : false,
    error : null,
    reroute : null
}

export default rootReducer = (state=initialState, action) => {
    if (action.type === DIPSLAY_LOADING) {
        return Object.assign({}, state, {
            loading : true,
        });
    } else if (action.type === START_CONVERSATION) {
        return Object.assign({}, state, {
            route : action.route,
            conversationData : action.conversationData,
            conversationList : [],
            loading : false,
            error : null
        });
    } else if (action.type === DISPLAY_ERROR) {
        return Object.assign({}, state, {
            loading : false,
            error : action.error
        });
    } else if (action.type === DISPLAY_AVAILABLE_CONVERSATION_LIST) {
        return Object.assign({}, state, {
            conversationList : action.conversationList,
            loading : false,
            error : null
        });
    }
}