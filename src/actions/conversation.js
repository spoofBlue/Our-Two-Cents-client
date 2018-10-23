
const TEMP_CONVODATA = {
    conversationId : "11112",
    yourUsername : "Paul",
    yourUserId : "AAAAA",
    otherUsername : "Laura",
    otherUserId : "BBBBB",
    topicId : "2",
    topicName : "Gun Control",
}

const TEMP_MESSAGELIST = {
    messageList : [
        {
        userId : "AAAAA",
        timeSent : "18:39:22",
        text : "Hello, my name is Paul. Nice to meet you."
        }, {
        userId : "BBBBB",
        timeSent : "18:39:28",
        text : "Hi, I'm Laura, it's a pleasure! Where are you from?"
        }, {
        userId : "AAAAA",
        timeSent : "18:39:39",
        text : "I'm from Oklahoma. Born and raised in a small town called Stillwater."  
        }, {
        userId : "AAAAA",
        timeSent : "18:39:44",
        text : "As you can imagine, I've grown up with firearms most my life."
        }
    ],
}

export const DISPLAY_MESSAGE = 'DISPLAY_MESSAGE';
export const displayMessage = (message) => ({
    type : DISPLAY_MESSAGE,
    message
});

export const DISPLAY_INITIAL_CONNECTION = `DISPLAY_INITIAL_CONNECTION`;
export const displayInitialConnection = () => ({
    type : DISPLAY_INITIAL_CONNECTION
});

export const UPDATE_CONVO_DATA = 'UPDATE_CONVO_DATA';
export const updateConvoData = convoData => ({
    type : UPDATE_CONVO_DATA,
    convoData
});

/*
export const updateMessageList = (message, messageList, username) => dispatch => {

};
*/

export const initializeConversation = convoData => dispatch => {
    dispatch(getConversationData(convoData));  // This is asynchronous, treat it accordingly when server brought in.
    dispatch(displayInitialConnection);
}

export const getConversationData = convoData => dispatch => {
    // Makes a fetch(GET) request using convoData.conversationId to the server to get any of the missing information on this conversation.
    // Specifically, the otherUsername and otherUserId (as we could already have the other information with us).
    const convoData = TEMP_CONVODATA;
    dispatch(updateConvoData(convoData));
}