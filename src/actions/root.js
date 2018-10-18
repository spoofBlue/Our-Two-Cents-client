
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

// Temporary Globals replacing fetched data.
const TEMP_CONVERSATION_AVAILABILITY_STATUS = {
    available : true
    // error : {text : `Conversation has closed or already started.`}
};

const TEMP_CONVERSATION_AVAILABLE_LIST = {
    conversationList : [{
        conversationId : '11111',
        userId : `AAAAA`,
        topicId : '1',
        topicName : `Abortion`,
        userViewpoint : `I believe it should be illegal, under any circumstance.`,
        datePosted : `10-25-18 19:30`
    }, {
        conversationId : '11112',
        userId : `BBBBB`,
        topicId : '2',
        topicName : `Gun Control`,
        userViewpoint : `I believe we need to ban all firearms in this country.`,
        datePosted : `10-25-18 20:36`
    }, {
        conversationId : '11113',
        userId : `CCCCC`,
        topicId : '3',
        topicName : `Immigration Reform`,
        userViewpoint : `I don't think we're doing enough to vet immigrants from coming into the country.`,
        datePosted : `10-25-18 20:36`
    }
]};

// actions

export const DISPLAY_LOADING = `DISPLAY_LOADING`;
export const displayLoading = () => ({
    type : DISPLAY_LOADING,
});

export const START_CONVERSATION = `START_CONVERSATION`;
export const startConversation = (availableConversationData) => ({
    type : START_CONVERSATION,
    route : `/conversation/${availableConversationData.conversationId}`,
    conversationData : availableConversationData,
});

export const DISPLAY_ERROR = `DISPLAY_ERROR`;
export const displayError = status => ({
    type : DISPLAY_ERROR,
    error : status.error
});

export const DISPLAY_AVAILABLE_CONVERSATION_LIST = `DISPLAY_AVAILABLE_CONVERSATION_LIST`;
export const displayAvailableConversationList = (conversationList) => ({
    type : DISPLAY_AVAILABLE_CONVERSATION_LIST,
    conversationList
});

// factory functions

export const checkConversationAvailability = (conversationId) => {
    // !!!! make a POST fetch request to the server to see if conversationId still has status 'available' = true;
    return Promise.resolve(TEMP_CONVERSATION_AVAILABILITY_STATUS);
}
// make a fetch(POST) the conversation has found a 2nd member too

export const prepareConversation = (availableConversationData) => dispatch => {
    // availableConversationData should have conversationId, userHostId, topicId, topicName.
    dipsatch(displayLoading());
    /* for when asynchonous calls are brought in.
    checkConversationAvailability(availableConversationData.conversationId)
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then({available} => {!!!!})
    .catch(err => {!!!!});
    */
    if (checkConversationAvailability(availableConversationData.conversationId).available) {   // .available is boolean
        dispatch(startConversation(availableConversationData));
    } else {
        if (TEMP_CONVERSATION_AVAILABILITY_STATUS.error) {
            dispatch(displayError(TEMP_CONVERSATION_AVAILABILITY_STATUS));
        }
        dispatch(getAvailableConversationList());
    }
}

export const getAvailableConversationList = () => dispatch => {
    // !!!! Make a fetch GET request here to get the conversationAvailableList.
    /* for when asynchonous calls are brought in.
    .then()
    .catch()
    */
    const conversationList = TEMP_CONVERSATION_AVAILABLE_LIST;
    dispatch(displayAvailableConversationList(conversationList));
};