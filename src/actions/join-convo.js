
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import { createSendBirdChannel, setSendBirdChannelPreference, inviteToSendBirdChannel } from './sendbird';

//import {sendbirdInstance} from '../components/App';
import SendBirdAction from './sendbirdAction';

/* A topic has these properties before user interacts with it.
    conversationId : this._id,
    hostUserId : this.hostUserId,
    hostUsername : this.hostUsername,
    hostViewpoint : this.hostViewpoint,
    topicId : this.topicId,
    topicName : this.topicName,
    status : this.status
*/

// Actions
export const DISPLAY_LOADING = `DISPLAY_LOADING`;
export const displayLoading = () => ({
    type: DISPLAY_LOADING,
});

export const MOVE_TO_CONVERSATION = `MOVE_TO_CONVERSATION`;
export const moveToConversation = (conversationId) => ({
    type: MOVE_TO_CONVERSATION,
    conversationId
});

export const DISPLAY_ERROR = `DISPLAY_ERROR`;
export const displayError = status => ({
    type: DISPLAY_ERROR,
    error: status.error
});

export const DISPLAY_AVAILABLE_CONVERSATIONS_LIST = `DISPLAY_AVAILABLE_CONVERSATIONS_LIST`;
export const displayAvailableConversationsList = (conversationList) => ({
    type: DISPLAY_AVAILABLE_CONVERSATIONS_LIST,
    conversationList
});

export const RESET_COMPONENT = `RESET_COMPONENT`;
export const resetComponent = () => ({
    type: RESET_COMPONENT
});

export const getAvailableConversationsList = () => dispatch => {
    // Retrieves the availableConversations with the status = 'available'.
    fetch(`${API_BASE_URL}/api/availableConversations`, {
        method: 'GET'
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(conversationList => {
            dispatch(displayAvailableConversationsList(conversationList));
        })
        .catch(err => {
            console.log(`getAvailableConversationList. err=`, err);
        });
};

export const prepareConversation = (conversationId, userId, username) => dispatch => {
    // Central function to verify conversation is still available, success means user 
    // ConversationData should have conversationId, hostUserId, hostUsername, topicId, topicName.
    dispatch(displayLoading());
    checkConversationAvailability(conversationId)
        .then(res => {
            console.log(`prepareconversation. res=`, res);
            if (res.status === `unavailable`) {
                dispatch(getAvailableConversationsList());
            } else if (res.status === `joined` && verifyHaveConversationData(res)) {
                const conversationData = combineConversationData(res, userId, username);
                dispatch(startConversation(conversationData));
            } else {
                if (res.error) {
                    dispatch(displayError(res.error));
                }
            }
        })
        .catch(err => {
            console.log(`prepareconversation. err=`, err);
        });
};

const checkConversationAvailability = (conversationId) => {
    // make a fetch(PUT) request to set the availableConversation's status on server to 'closed', if it's available.  !! this will inform the 2nd member too
    // if that the status was not 'available' when making the request, we receive that notification too.
    return (
        fetch(`${API_BASE_URL}/api/availableConversations/${conversationId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                conversationId: conversationId,
                status: 'joined'
            })
        })
            .then(res => normalizeResponseErrors(res))
            .then(res => res.json())
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
            })
    );
};

const verifyHaveConversationData = res => {
    const keys = [`conversationId`, `hostUserId`, `hostUsername`, `topicId`, `topicName`, `status`];
    keys.forEach(key => {
        if (!res.hasOwnProperty(key)) {
            return false;
        }
    });
    return true;
}

const combineConversationData = (res, userId, username) => ({
    // Explicityly showing each field here shouldn't be necessary to just add userId, username. Done more for code onlookers to know what's here.
    conversationId: res.conversationId,
    hostUserId: res.hostUserId,
    hostUsername: res.hostUsername,
    guestUserId: userId,
    guestUsername: username,
    topicId: res.topicId,
    topicName: res.topicName
});

const startConversation = (conversationData) => dispatch => {
    const sendbirdInstance = SendBirdAction.getInstance();
    let channelURL;
    let establishChannelCreation = new Promise(function (resolve, reject) {
        sendbirdInstance.createSendBirdChannel(conversationData)
            .then(groupChannel => {
                channelURL = groupChannel.url;

                resolve();
            })
            .catch(err => dispatch(displayError(err)));
        // !!! expecting something like sendbird_group_channel_82716964_9be546b931d38f17153242db77c2456460de341b
    });

    return establishChannelCreation
        .then(() => postConversationDataToServer(conversationData, channelURL))
        .then(() => sendbirdInstance.setSendBirdChannelPreference())
        .then(() => sendbirdInstance.inviteToSendBirdChannel(conversationData, channelURL))
        .then(() => {
            dispatch(moveToConversation(conversationData.conversationId));
        })
        .catch(err => {
            dispatch(displayError(err));
        });
};

const postConversationDataToServer = (conversationData, channelURL) => {
    // Sends the other participating user the channelURL of the group channel they are connecting through. 
    // We store this link in the conversation POST.
    console.log(`postConversationDataToSErver. channelURL=`, channelURL);
    return fetch(`${API_BASE_URL}/api/conversations/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            conversationId: conversationData.conversationId,
            channelURL: channelURL,
            hostUserId: conversationData.hostUserId,
            hostUsername: conversationData.hostUsername,
            guestUserId: conversationData.guestUserId,
            guestUsername: conversationData.guestUsername,
            topicId: conversationData.topicId,
            topicName: conversationData.topicName
        })
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        });
}