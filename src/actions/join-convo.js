
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

// Temporary Globals replacing fetched data.
const TEMP_CONVERSATION_AVAILABILITY_STATUS = {
    available : true
};

const TEMP_CONVERSATIONS_AVAILABLE_LIST = {
    conversationList : [{
        conversationId : '11111',
        hostUserId : `AAAAA`,
        hostUsername : 'Laura K.',
        topicId : '1',
        topicName : `Abortion`,
        userViewpoint : `I believe it should be illegal, under any circumstance.`,
    }, {
        conversationId : '11112',
        hostUserId : `BBBBB`,
        hostUsername : 'Paul S.',
        topicId : '2',
        topicName : `Gun Control`,
        userViewpoint : `I believe we need to ban all firearms in this country.`,
    }, {
        conversationId : '11113',
        hostUserId : `CCCCC`,
        hostUsername : 'Randal M.',
        topicId : '3',
        topicName : `Immigration Reform`,
        userViewpoint : `I don't think we're doing enough to vet immigrants from coming into the country.`,
    }
]};

/*
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
    type : DISPLAY_LOADING,
});

export const START_CONVERSATION = `START_CONVERSATION`;
export const startConversation = (conversationData) => ({
    type : START_CONVERSATION,
    conversationData : conversationData,
});

export const DISPLAY_ERROR = `DISPLAY_ERROR`;
export const displayError = status => ({
    type : DISPLAY_ERROR,
    error : status.error
});

export const DISPLAY_AVAILABLE_CONVERSATIONS_LIST = `DISPLAY_AVAILABLE_CONVERSATIONS_LIST`;
export const displayAvailableConversationsList = (conversationList) => ({
    type : DISPLAY_AVAILABLE_CONVERSATIONS_LIST,
    conversationList
});

export const RESET_COMPONENT = `RESET_COMPONENT`;
export const resetComponent = () => ({
    type : RESET_COMPONENT
});

// Intermediary functions

export const getAvailableConversationsList = () => dispatch => {
    // Retrieves the availableConversations with the status = 'available'.
    console.log(`run getAvailableConversationList`);
    let conversationList;
    fetch(`${API_BASE_URL}/availableConversations`, {
        method : 'GET'
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(conversationList => {
        console.log(`getAvailableConversationList. conversationList=`, conversationList);
        dispatch(displayAvailableConversationsList(conversationList));
    })
    .catch(err => {
        console.log(`getAvailableConversationList. err=`, err);
    });
};

export const prepareConversation = (conversationId, userId, username) => dispatch => {
    // conversationData should have conversationId, hostUserId, hostUsername, userId, username, topicId, topicName.
    dispatch(displayLoading());
    console.log(`ran prepareConversation. conversationId=`, conversationId);
    return checkConversationAvailability(conversationId)
    .then(res => {
        console.log(`prepareconversation. res=`, res);
        if (res.status === `unavailable`) {
            dispatch(getAvailableConversationsList());
        } else if (res.status === `joined` && verifyHaveConversationData(res)) {
            const conversationData = combineConversationData(res, userId, username);
            console.log('prepareConversation. in joined. conversationData=', conversationData);
            dispatch(startConversation(conversationData));
        } else {
            console.log(`prepareConversation. res=`, res);
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
        fetch(`${API_BASE_URL}/availableConversations/${conversationId}`, {
            method: 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                conversationId : conversationId,
                status : 'joined'
            })
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(res => {
            console.log(`checkConvesationAvailablitliy. res=`, res);
            return res;
        })
    );
};

const verifyHaveConversationData = res => {
    const keys = [`conversationId`,`hostUserId`,`hostUsername`,`topicId`,`topicName`,`status`];
    keys.forEach(key => {
        if (!res.hasOwnProperty(key)) {
            return false;
        }
    });
    return true;
}

const combineConversationData = (res, userId, username) => ({
    conversationId : res.conversationId,
    hostuserId : res.hostUserId,
    hostUsername : res.hostUsername,
    guestuserId : userId,
    guestUsername : username,
    topicId : res.topicId,
    topicName : res.topicName
});
