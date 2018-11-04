
import {acceptInviteToSendBirdChannel, leaveSendBirdChannel} from './sendbird'

import { displayError } from "./join-convo";

// Functions
export const DISPLAY_MESSAGE_LIST = 'DISPLAY_MESSAGE_LIST';
export const displayMessageList = (messageList) => ({
    type : DISPLAY_MESSAGE_LIST,
    messageList
});

export const DISPLAY_CONVERSATION_STARTED = `DISPLAY_CONVERSATION_STARTED`;
export const displayConversationStarted = () => ({
    type : DISPLAY_CONVERSATION_STARTED
});

export const UPDATE_CONVERSATION_DATA = 'UPDATE_CONVERSATION_DATA';
export const updateConversationData = conversationData => ({
    type : UPDATE_CONVERSATION_DATA,
    conversationData
});

export const DISPLAY_CONVERSATION_FINISHED = `DISPLAY_CONVERSATION_FINISHED`;
export const displayConversationFinished = () => ({
    type : DISPLAY_CONVERSATION_FINISHED
});

export const DISPLAY_CONVERSATION_LEAVING = `DISPLAY_CONVERSATION_LEAVING`;
export const displayConversationLeaving = () => ({
    type : DISPLAY_CONVERSATION_LEAVING
});

export const RESET_COMPONENT = `RESET_COMPONENT`;
export const resetComponent = () => ({
    type : RESET_COMPONENT
});

export const enterConversation = (conversationId, userId, username) => dispatch => {
    let acceptChannel = new Promise(function(resolve, reject) {
        resolve(acceptInviteToSendBirdChannel());
    });

    return acceptChannel
    .then(() => {
        console.log(`enterConversation. accepted channel`);
        dispatch(displayConversationStarted());
    })
    .catch(err => {
        dispatch(displayError(err));
    });
}
// Exit Conversation

export const exitConversation = () => dispatch => {
    // Leaves the conversation, but first sends a POST request notifying the server and other user they're leaving.
    leaveSendBirdChannel();
    dispatch(displayConversationFinished());
    dispatch(displayConversationLeaving());
}

// Messaging
export const processSubmittedMessage = (message, currentUser) => dispatch => {  // I won't need to bring in messageList when I can retrieve it from the server.
    // function above retrieves messageList
    postMessage(message, currentUser.username);
    //dispatch(displayMessageList(newMessageList));
};