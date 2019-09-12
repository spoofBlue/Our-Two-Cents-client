
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

export const LEAVE_CONVERSATION = `LEAVE_CONVERSATION`;
export const leaveConversation = () => ({
    type: LEAVE_CONVERSATION
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

export const enterConversation = (conversationId, userId) => dispatch => {
    // Enters the user into a 1 on 1 conversation, using the conversationId previously assigned by SendBird.
    // Must create a channel, get the handler (event listener) for the channel, retrieve the messageList
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
            return sendbirdInstance.getSendBirdChannel(conversationData.channelURL);
        })
        .then(groupChannel => {
            let channelId = `${conversationData.conversationId}-${conversationData.userId}`;
            return sendbirdInstance.createChannelEventHandler(channelId);
        })
        .then(eventHandler => {
            handler = eventHandler;
            return sendbirdInstance.getMessageList(conversationData.channelURL);
        })
        .then(messageList => {
            handler.onMessageReceived = (channel, message) => {
                dispatch(renderMessageList(messageList, message));
            }
            handler.onUserLeft = (channel, user) => {
                dispatch(displayConversationFinished());
            };

            conversationData.handler = handler;
            dispatch(updateConversationData(conversationData));
            dispatch(displayConversationStarted());
            dispatch(renderMessageList(messageList));
        })
        .catch(err => {
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
            return res;
        })
        .catch(err => {
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
        resolve(sendbirdInstance.leaveSendBirdChannel(conversationData.channelURL));
    });
    closeEventHandler
        .then(() => sendbirdInstance.removeChannelHandler(conversationData.channelURL))
        .then(() => {
            dispatch(displayConversationFinished());
            dispatch(leaveConversation());
        })
        .catch(() => {
            dispatch(displayConversationFinished());
            dispatch(leaveConversation());
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
            return sendbirdInstance.getSendBirdChannel(conversationData.channelURL);
        })
        .then(groupChannel => {
            let message = groupChannel.lastMessage;
            dispatch(renderMessageList(messageList, message));
        })
        .catch(err => {
            dispatch(displayError(err));
        });
};

export const renderMessageList = (messageList = [], message) => dispatch => {
    if (message) {
        messageList.push(message);
    }
    dispatch(displayMessageList(messageList));
}