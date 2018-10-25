
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

export const DISPLAY_MESSAGE_LIST = 'DISPLAY_MESSAGE_LIST';
export const displayMessageList = (messageList) => ({
    type : DISPLAY_MESSAGE_LIST,
    messageList
});

export const DISPLAY_CONVERSATION_STARTED = `DISPLAY_CONVERSATION_STARTED`;
export const displayConversationStarted = () => ({
    type : DISPLAY_CONVERSATION_STARTED
});

export const UPDATE_CONVO_DATA = 'UPDATE_CONVO_DATA';
export const updateConvoData = convoData => ({
    type : UPDATE_CONVO_DATA,
    convoData
});

export const DISPLAY_CONVERSATION_FINISHED = `DISPLAY_CONVERSATION_FINISHED`;
export const displayConversationFinished = () => ({
    type : DISPLAY_CONVERSATION_FINISHED
});

export const DISPLAY_CONVERSATION_LEAVING = `DISPLAY_CONVERSATION_LEAVING`;
export const displayConversationLeaving = () => ({
    type : DISPLAY_CONVERSATION_LEAVING
});

/*
export const updateMessageList = (message, messageList, username) => dispatch => {

};
*/

export const initializeConversation = (conversationId) => dispatch => {
    dispatch(getConversationData(conversationId));  // This is asynchronous, treat it accordingly when server brought in.
    dispatch(displayConversationStarted());
}

export const getConversationData = (conversationId) => dispatch => {
    // Makes a fetch(GET) request using convoData.conversationId to the server to get any of the missing information on this conversation.
    // Specifically, the otherUsername and otherUserId (as we could already have the other information with us).
    console.log(`fetch request will get data for `, conversationId);
    const convoData = TEMP_CONVODATA;
    dispatch(updateConvoData(convoData));
}

export const exitConversation = (convoData) => dispatch => {
    // Leaves the conversation, but first sends a POST request notifying the server and other user they're leaving.
    dispatch(notifyServerUserOfExit(convoData));  // Uncaught Error: Actions must be plain objects. Use custom middleware for async actions. !! But no async work here yet?
    dispatch(displayConversationFinished());
    dispatch(displayConversationLeaving());
}

export const notifyServerUserOfExit = (convoData) => {
    console.log(`other user ${convoData.otherUsername} notified of you leaving.`);
}

export const processSubmittedMessage = (conversationId, messageList, message) => dispatch => {  // I won't need to bring in messageList when I can retrieve it from the server.
    const newMessageList = dispatch(sendMessageToUser(conversationId, messageList, message));  // aynsc, everything following is in response to this promise.
    // function above retrieves messageList
    dispatch(displayMessageList(newMessageList));
};

export const sendMessageToUser = (conversationId, messageList, message) => {
    // Make a fetch(POST) request to the server, adding this message to the messageList.
    // Will get a response with the updated messageList.
    return addMessageToMessageList(messageList, message);  // !!! This is temporary, we'll actually get the offical messageList from the server
};

export const addMessageToMessageList = (messageList, message) => {
    console.log('messageList=', messageList);
    messageList.push(message);
    return messageList;
}

export const getMessageListFromServer = () => {
    // Make a fetch(GET) request to the server, grabbing the messageList.  Used to retrieve new messaegs from other user.
    // return messageList;
}
