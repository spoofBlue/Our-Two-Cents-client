
import SendBird from 'sendbird';

let sendbird;
let GROUP_CHANNEL;

export const initializeSendBird = () => {
    console.log(`sendbird. initializeSendBird`);
    sendbird = new SendBird({appId: 'BDEEA390-7760-4E15-8C9B-06C311285004'});
}

// !!!! Update the nicknames of the people that join.
export const accessSendBird = (userId, username = "Dummy name.") => {
    console.log(`sendbird. accessSendBird. userId=`, userId);
    sendbird.connect(userId, function(user, error) {
        console.log(`sendbird. accessSendBird user=`, user);
        if (error) {
            console.log(`sendbird. accessSendBird. error=`, error);
            return;
        }
    });
}

export const createSendBirdChannel = (conversationData) => {
    console.log(`sendbird. createSendBirdChannel`);
    let params = new sendbird.GroupChannelParams();
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
    

    sendbird.GroupChannel.createChannel(params, function(groupChannel, error) {
        console.log(`sendbird. createSendBirdChannel. groupChannel=`, groupChannel);
        if (error) {
            console.log(`createSendBirdChannel error=`, error);
            return;
        }
        GROUP_CHANNEL = groupChannel;
        return GROUP_CHANNEL;
    });
}

export const inviteToSendBirdChannel = (conversationData) => {
    console.log(`sendbird. inviteToSendBirdChannel. conversationData=`, conversationData);
    // Do after createSendBirdChannel
    let userIds = [conversationData.hostUserId, conversationData.guestUserId];

    GROUP_CHANNEL.inviteWithUserIds(userIds, function(response, error) {
        console.log(`sendbird. inviteToSendBirdChannel. response=`, response);
        if (error) {
            console.log(`sendbird. inviteToSendBirdChannel. error=`, error);
            return;
        }
        return;
    });
}

export const acceptInviteToSendBirdChannel = () => {
    console.log(`sendbird. acceptInviteToSendBirdChannel.`);
    let autoAccept = true;    // If true, a user will automatically join a group channel with no choice of accepting and declining an invitation.
    sendbird.setChannelInvitationPreference(autoAccept, function(response, error) {
        if (error) {
            return;
        }
    });

    // Auto-accepting an invitation
    GROUP_CHANNEL.acceptInvitation(function(response, error) {
        console.log(`sendbird. acceptInviteToSendBirdChannel. response=`, response);
        if (error) {
            return;
        }
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
    GROUP_CHANNEL.leave(function(response, error) {
        console.log(`sendbird. leaveSendBirdChannel. response=`, response);
        if (error) {
            return;
        }
    });
}

export const exitSendBird = () => {
    sendbird.disconnect();
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
    sendbird.addChannelHandler(conversationData.conversationId, ChannelHandler)
}

export const removeSendBirdChannelHandler = (conversationData) => {
    sendbird.removeChannelHandler(conversationData.conversationId);
}
*/