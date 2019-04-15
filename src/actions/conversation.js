
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

import SendBirdAction from './sendbirdAction';

// Functions
export const DISPLAY_MESSAGE_LIST = 'DISPLAY_MESSAGE_LIST';
export const displayMessageList = (messageList) => ({
    type: DISPLAY_MESSAGE_LIST,
    messageList
});

export const DISPLAY_CONVERSATION_STARTED = `DISPLAY_CONVERSATION_STARTED`;
export const displayConversationStarted = () => ({
    type: DISPLAY_CONVERSATION_STARTED
});

export const UPDATE_CONVERSATION_DATA = 'UPDATE_CONVERSATION_DATA';
export const updateConversationData = conversationData => ({
    type: UPDATE_CONVERSATION_DATA,
    conversationData
});

export const UPDATE_HANDLER = `UPDATE_HANDLER`;
export const updateHandler = handler => ({
    type: UPDATE_HANDLER,
    handler
});

export const DISPLAY_CONVERSATION_FINISHED = `DISPLAY_CONVERSATION_FINISHED`;
export const displayConversationFinished = () => ({
    type: DISPLAY_CONVERSATION_FINISHED
});

export const DISPLAY_CONVERSATION_LEAVING = `DISPLAY_CONVERSATION_LEAVING`;
export const displayConversationLeaving = () => ({
    type: DISPLAY_CONVERSATION_LEAVING
});

export const RESET_COMPONENT = `RESET_COMPONENT`;
export const resetComponent = () => ({
    type: RESET_COMPONENT
});

export const DISPLAY_ERROR = `DISPLAY_ERROR`;
export const displayError = status => ({
    type: DISPLAY_ERROR,
    error: status.error
});

export const enterConversation = (conversationId, userId, messageList) => dispatch => {
    const sendbirdInstance = SendBirdAction.getInstance();
    let getConversation = new Promise(function (resolve, reject) {
        // !!!! If I also insert the userId here. I could check to see if this user is suppose to be in this conversation,
        // and not get the conversation if the user is not present.
        resolve(getConversationDataFromServer(conversationId));
    });
    let conversationData;
    let handler;

    return getConversation
        .then(res => {
            conversationData = interpretConversationData(res, userId);
            console.log(`enterConversation. getConversation's conversationData=`, conversationData);
            return sendbirdInstance.getSendBirdChannel(conversationData.channelURL);
        })
        .then(groupChannel => {
            console.log(`enterConversation. groupChannel=`, groupChannel);
            let channelId = `${conversationData.conversationId}-${conversationData.userId}`;
            return sendbirdInstance.createChannelEventHandler(channelId);
        })
        .then(eventHandler => {
            handler = eventHandler;
            console.log(`in chatElemet. channel's handler=`, handler);
            sendbirdInstance.getMessageList(conversationData.channelURL);
            console.log(`in chatElemet. channel's messageList=`, messageList);
            handler.onMessageReceived = (channel, message) => {
                console.log(`in chatElemet. channel=`, channel);
                console.log(`in chatElemet. message=`, message);
                dispatch(renderMessageList(messageList, message));
            }
            handler.onUserLeft = (channel, user) => {
                console.log(`${user} left.`);
                dispatch(displayConversationFinished());
            };
            conversationData.handler = handler;
            dispatch(updateConversationData(conversationData));
            dispatch(displayConversationStarted());
            dispatch(renderMessageList(messageList));
        })
        .catch(err => {
            console.log(`enterConversation. err=`, err);
            dispatch(displayError(err));
        });
}

const getConversationDataFromServer = (conversationId) => {
    // Sends the other participating user the channelURL of the group channel they are connecting through. 
    // We store this link in the conversation POST.
    return fetch(`${API_BASE_URL}/api/conversations/${conversationId}`, { method: 'GET' })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(res => {
            console.log(`getConversationDataFromServer. res=`, res);
            return res;
        })
        .catch(err => {
            console.log(`getConversationDataFromServer. err=`, err);
            return err;
        });
}

const interpretConversationData = (data, userId) => {
    // The conversation data doesn't specify which user is you, so we use our userId to determine which userId and username belong to the other person:
    // Which will become otherPersonUserId and OtherPersoneUsername, respectively.
    const conversationData = {
        conversationId: data.conversationId,
        channelURL: data.channelURL,
        otherPersonUserId: data.hostUserId !== userId ? data.hostUserId : data.guestUserId,
        otherPersonUsername: data.hostUserId !== userId ? data.hostUsername : data.guestUsername,
        topicId: data.topicId,
        topicName: data.topicName
    }
    return conversationData
}

// Exit Conversation

export const exitConversation = (conversationData) => dispatch => {
    // Leaves the conversation, but first sends a POST request notifying the server and other user they're leaving.
    const sendbirdInstance = SendBirdAction.getInstance();
    let closeEventHandler = new Promise(function (resolve, reject) {
        resolve(sendbirdInstance.removeChannelHandler(conversationData.channelURL));
    });
    closeEventHandler
        .then(() => sendbirdInstance.leaveSendBirdChannel())
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

export const processSubmittedMessage = (message, conversationData, messageList) => dispatch => {
    // I won't need to bring in messageList when I can retrieve it from the server.
    const sendbirdInstance = SendBirdAction.getInstance();
    const posting = new Promise(function (resolve, reject) {
        resolve(sendbirdInstance.postMessageToChannel(message, conversationData.channelURL));
    });

    return posting
        .then(() => {
            console.log(`in processSubmittedMessage after postMessageToChannel.`);
            return sendbirdInstance.getSendBirdChannel(conversationData.channelURL);
        })
        .then(groupChannel => {
            console.log(`processSubmittedMessage. lastMessage=`, groupChannel.lastMessage);
            let message = groupChannel.lastMessage;
            dispatch(renderMessageList(messageList, message));
        })
        .catch(err => {
            dispatch(displayError(err));
        });
};

export const renderMessageList = (messageList = [], message) => dispatch => {
    console.log('in renderMessageList. message=', message);
    if (message) {
        messageList.push(message);
    }
    console.log(`in renderMessageList. newMessageList=`, messageList);
    dispatch(displayMessageList(messageList));
}