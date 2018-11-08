
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {acceptInviteToSendBirdChannel, leaveSendBirdChannel, getSendBirdChannel, createChannelEventHandler, 
    postMessageToChannel, getMessageList, removeChannelHandler, messageRecievedEvent} from './sendbird';
import SendBird from './sendbirdComponent';

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
    let getConversation = new Promise(function(resolve, reject) {
        resolve(getConversationDataFromServer(conversationId));
    });
    let conversationData;

    return getConversation
    .then(res => {
        conversationData = interpretConversationData(res, userId);
        console.log(`enterConversation. getConversation's conversationData=`, conversationData);
        return getSendBirdChannel(conversationData.channelURL);
    })
    .then(groupChannel => {
        console.log(`enterConversation. groupChannel=`, groupChannel);
        let channelId = `${conversationId}-${userId}`
        return createChannelEventHandler(channelId);
    })
    .then(handler => {
        console.log(`enterConversation. handler=`, handler);
        dispatch(updateConversationData(conversationData));
        dispatch(displayConversationStarted());
    })
    .catch(err => {
        console.log(`enterConversation. err=`,err);
        dispatch(displayError(err));
    });
}

const getConversationDataFromServer = (conversationId) => {
    // Sends the other participating user the channelURL of the group channel they are connecting through. 
    // We store this link in the conversation POST.
    return fetch(`${API_BASE_URL}/api/conversations/${conversationId}`, {
        method : 'GET'
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
        console.log(`getConversationDataFromServer. res=`, res);
        return res;
    })
    .catch(err => {
        console.log(err);
        return err;
    });
}

const interpretConversationData = (data, userId) => {
    // The conversation data doesn't specify which user is you, so we use our userId to determine which userId and username belong to the other person:
    // Which will become otherPersonUserId and OtherPersoneUsername, respectively.
    const conversationData = {
        conversationId : data.conversationId,
        channelURL : data.channelURL,
        otherPersonUserId : data.hostUserId !== userId ? data.hostUserId : data.guestUserId,
        otherPersonUsername : data.hostUserId !== userId ? data.hostUsername : data.guestUsername,
        topicId : data.topicId,
        topicName : data.topicName
    }
    return conversationData
}

// Exit Conversation

export const exitConversation = (conversationData) => dispatch => {
    // Leaves the conversation, but first sends a POST request notifying the server and other user they're leaving.
    let closeEventHandler = new Promise(function(resolve, reject) {
        resolve(removeChannelHandler(conversationData.channelURL));
    });
    closeEventHandler
    .then(() => leaveSendBirdChannel())
    .then(() => {
        dispatch(displayConversationFinished());
        dispatch(displayConversationLeaving());
    })
    .catch(() => {
        dispatch(displayConversationFinished());
        dispatch(displayConversationLeaving());
    });
}

// Messaging
export const processSubmittedMessage = (message) => dispatch => {  // I won't need to bring in messageList when I can retrieve it from the server.
    // function above retrieves messageList
    const posting = new Promise(function(resolve, reject) {
        resolve(postMessageToChannel(message));
    });

    return posting
    .then(() => {
        console.log(`in processSubmittedMessage after postMessageToChannel.`);
        return getMessageList();
    })
    .then(messageList => {
        dispatch(displayMessageList(messageList));
    })
    .catch(err => {
        dispatch(displayError(err));
    });
};

export const renderMessageList = (messageList, message) => dispatch => {
    console.log(`made it into renderMessage.`);
    const newMessageList = messageList.push(message);
    dispatch(displayMessageList(newMessageList));
}