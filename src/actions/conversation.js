
import { displayError } from "./join-convo";
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

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
    return getConversationFromServer(conversationId)
    .then(res => {
        const conversationData = interpretConversationData(res, userId, username);
        console.log(`enterConversation. conversationData=`, conversationData);
        dispatch(updateConversationData(conversationData));
        dispatch(displayConversationStarted());
    })
    .catch(err => {
        displayError(err);
    });
}

export const getConversationFromServer = (conversationId) => {
    // Makes a fetch(GET) request using convoData.conversationId to the server to get any of the complete information on this conversation.
    console.log(`fetch request will get data for `, conversationId);
    return fetch(`${API_BASE_URL}/conversations/${conversationId}`, {
        method : 'GET'
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
        console.log(`getConversationFromServer. res=`, res);
        return res;
    })
    .catch(err => {
        return err;
    });
}

const interpretConversationData = (data, userId, username) => {
    // The conversation data doesn't specify which user is you, so we use our userId to determine which userId and username belong to the other person:
    // Which will become otherPersonUserId and OtherPersoneUsername, respectively.
    const conversationData = {
        conversationId : data.conversationId,
        otherPersonUserId : data.hostUserId !== userId ? data.hostUserId : userId,
        otherPersonUsername : data.hostUserId !== userId ? data.hostUsername : username,
        topicId : data.topicId,
        topicName : data.topicName
    }
    return conversationData
}

// Messaging
export const processSubmittedMessage = (conversationId, messageList, message) => dispatch => {  // I won't need to bring in messageList when I can retrieve it from the server.
    const newMessageList = sendMessageToUser(conversationId, messageList, message);  // aynsc, everything following is in response to this promise.
    // function above retrieves messageList
    dispatch(displayMessageList(newMessageList));
};

const sendMessageToUser = (conversationId, messageList, message) => {
    // Make a fetch(POST) request to the server, adding this message to the messageList of the conversation with conversationId.
    // Will get a response with the updated messageList.
    return addMessageToMessageList(messageList, message);  // !!! This is temporary, we'll actually get the offical messageList from the server
};

const addMessageToMessageList = (messageList, message) => {
    messageList.push(message);
    console.log('messageList=', messageList);
    return messageList;
}

export const getMessageListFromServer = () => {
    // Make a fetch(GET) request to the server, grabbing the messageList.  Used to retrieve new messaegs from other user.
    // return messageList;
}

// Exit Conversation

export const exitConversation = (convoData) => dispatch => {
    // Leaves the conversation, but first sends a POST request notifying the server and other user they're leaving.
    dispatch(notifyServerUserOfExit(convoData));
    dispatch(displayConversationFinished());
    dispatch(displayConversationLeaving());
}

const notifyServerUserOfExit = (convoData) => dispatch => {
    console.log(`other user ${convoData.otherPersonUsername} notified of you leaving.`);
    // PUT fetch request to server that conversationFinished
}