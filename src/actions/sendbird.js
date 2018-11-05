
import SendBird from 'sendbird';

let SENDBIRD;
let GROUP_CHANNEL;

export const initializeSendBird = () => {
    console.log(`sendbird. initializeSendBird`);
    SENDBIRD = new SendBird({appId: 'BDEEA390-7760-4E15-8C9B-06C311285004'});
}

// !!!! Update the nicknames of the people that join.
export const accessSendBird = (userId, username = "Dummy name.") => {
    console.log(`sendbird. accessSendBird. userId=`, userId);
    SENDBIRD.connect(userId, function(user, error) {
        console.log(`sendbird. accessSendBird user=`, user);
        if (error) {
            console.log(`sendbird. accessSendBird. error=`, error);
            return;
        }
    });
}

export const createSendBirdChannel = (conversationData) => {
    console.log(`sendbird. createSendBirdChannel`);
    let params = new SENDBIRD.GroupChannelParams();
    params.isPublic = false;
    params.isEphemeral = false;
    params.isDistinct = false;
    params.addUserIds([conversationData.hostUserId, conversationData.guestUserId]);
    params.operators = []; //No one will be allowed to ban, mute, or delete comments in the chat.
    params.name = conversationData.topicName;
    //params.coverImage = FILE;
    //params.coverUrl = COVER_URL;
    //params.customType = CUSTOM_TYPE;
    params.data = {hostUsername : conversationData.hostUsername, guestUsername : conversationData.guestUsername};
    
    return new Promise((resolve, reject) => {
        SENDBIRD.GroupChannel.createChannel(params, function(groupChannel, error) {
            console.log(`sendbird. createSendBirdChannel groupChannel=`, groupChannel);
            GROUP_CHANNEL = groupChannel;
        error ? reject(error) : resolve(groupChannel);
        });
    });
}

export const inviteToSendBirdChannel = (conversationData) => {
    console.log(`sendbird. inviteToSendBirdChannel. conversationData=`, conversationData);
    // Do after createSendBirdChannel
    let userIds = [conversationData.hostUserId, conversationData.guestUserId];

    return new Promise((resolve, reject) => {
        GROUP_CHANNEL.inviteWithUserIds(userIds, function(response, error) {
            console.log(`sendbird. inviteToSendBirdChannel. response=`, response);
            error ? reject(error) : resolve(response);
        });
    })
}

export const setSendBirdChannelPreference = () => {
    console.log(`sendbird. setSendBirdChannelPrefernce.`);
    let autoAccept = true;    // If true, a user will automatically join a group channel with no choice of accepting and declining an invitation.
    return new Promise((resolve, reject) => {
        SENDBIRD.setChannelInvitationPreference(autoAccept, function(response, error) {
            console.log(`sendbird. setSendBirdChannelPreference. response=`, response);
            error ? reject(error) : resolve(response);
        });
    });
}

export const acceptInviteToSendBirdChannel = () => {
    console.log(`sendbird. acceptInviteToSendBirdChannel.`);
    // Auto-accepting an invitation
    return new Promise((resolve, reject) => {
        GROUP_CHANNEL.acceptInvitation(function(response, error) {
            console.log(`sendbird. acceptInviteToSendBirdChannel. response=`, response);
            error ? reject(error) : resolve(response);
        });
    });
}

export const postMessage = (username, message) => {
    console.log(`sendbird. postMessage.`);
    GROUP_CHANNEL.sendUserMessage(message, username, function(message, error) {
        console.log(`sendbird. postMessage. message=`, message);
        if (error) {
            return;
        }
    });
}

export const leaveSendBirdChannel = () => {
    console.log(`sendbird. leaveSendBirdChannel.`);
    if (GROUP_CHANNEL) {
        GROUP_CHANNEL.leave(function(response, error) {
            console.log(`sendbird. leaveSendBirdChannel. response=`, response);
            if (error) {
                return;
            }
        });
    }
}

export const exitSendBird = () => {
    console.log(`sendbird. exitSendBird (connection removed, still initialized).`);
    SENDBIRD.disconnect();
}

/* Possible use.
Retrieve members online status in an open channel
To stay updated on each member's connection status, call refresh() before calling members of a group channel object. You can then get each of the users' connection statuses by checking user.getConnectionStatus.

By using user.connectionStatus at each User object in the returned list, you can check user's current connection status. The connectionStatus has one of the following three values:

nonavailable: user's status information cannot be reached.
offline: user is disconnected from SendBird.
online: user is connected to SendBird.
*/

/*
export const createSendBirdChannelHandler = (conversationData) => {
    SENDBIRD.addChannelHandler(conversationData.conversationId, ChannelHandler)
}

export const removeSendBirdChannelHandler = (conversationData) => {
    SENDBIRD.removeChannelHandler(conversationData.conversationId);
}
*/