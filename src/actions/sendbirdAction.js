import React from "react";
import SendBird from "sendbird";
const APP_ID = "BDEEA390-7760-4E15-8C9B-06C311285004";

let instance = null;

class SendBirdAction {
  constructor() {
    if (instance) {
      return instance;
    }
    // Connects this instance to Sendbird, if it isn't already.
    this.SENDBIRD = new SendBird({ appId: APP_ID });
    this.GROUP_CHANNEL = null;
    this.CHANNEL_HANDLER = null;
    this.userQuery = null;
    this.groupChannelQuery = null;
    this.previousMessageQuery = null;
    instance = this;
  }

  accessSendBird = (userId, username = "Anonymous ?") => {
    // Initially signs the user into SendBird, allowing this program to utilize SendBird's functionality for the remainder of the session.
    console.log(`sendbird. accessSendBird. userId=`, userId);
    return new Promise(function (resolve, reject) {
      const sb = SendBird.getInstance();
      sb.connect(userId, function (user, error) {
        console.log(`sendbird. accessSendBird user=`, user);
        const nickname = username;
        if (error) {
          console.log(`sendbird. accessSendBird. error=`, error);
          return;
        } else {
          sb.updateCurrentUserInfo(nickname, null, (user, error) => {
            error ? reject(error) : resolve(user);
          });
        }
      });
    });
  };

  createSendBirdChannel = conversationData => {
    // Given the user's information in conversationData, after both users have agreed to start a conversation, creates a channel
    // with the user's usernames.
    console.log(`sendbird. createSendBirdChannel`);
    let params = new this.SENDBIRD.GroupChannelParams();
    params.isPublic = false;
    params.isEphemeral = false;
    params.isDistinct = false;
    params.addUserIds([
      conversationData.hostUserId,
      conversationData.guestUserId
    ]);
    params.operators = []; //No one will be allowed to ban, mute, or delete comments in the chat.
    params.name = conversationData.topicName;
    //params.coverImage = FILE;  // Optional
    //params.coverUrl = COVER_URL;  // Optional
    //params.customType = CUSTOM_TYPE;  // Optional
    params.data = {
      hostUsername: conversationData.hostUsername,
      guestUsername: conversationData.guestUsername
    };

    return new Promise((resolve, reject) => {
      this.SENDBIRD.GroupChannel.createChannel(params, function (groupChannel, error) {
        console.log(`sendbird. createSendBirdChannel groupChannel=`, groupChannel);
        error ? reject(error) : resolve(groupChannel);
      });
    });
  };

  inviteToSendBirdChannel = (conversationData, channelURL) => {
    // After channel creation, both users are automatically invited to the channel. Sendbird's channel data now includes both users
    // as people who can join the channel.
    console.log(`sendbird. inviteToSendBirdChannel. conversationData=`, conversationData);
    let userIds = [conversationData.hostUserId, conversationData.guestUserId];

    return new Promise((resolve, reject) => {
      this.SENDBIRD.GroupChannel.getChannel(
        channelURL,
        (groupChannel, error) => {
          groupChannel.inviteWithUserIds(userIds, function (response, error) {
            console.log(`sendbird. inviteToSendBirdChannel. response=`, response);
            error ? reject(error) : resolve(response);
          });
        }
      );
    });
  };

  setSendBirdChannelPreference = () => {
    // Simply sets the channel preferences to auto accept users that are invited.
    console.log(`sendbird. setSendBirdChannelPrefernce.`);
    let autoAccept = true; // If true, a user will automatically join a group channel with no choice of accepting or declining an invitation.
    return new Promise((resolve, reject) => {
      this.SENDBIRD.setChannelInvitationPreference(autoAccept, function (response, error) {
        console.log(`sendbird. setSendBirdChannelPreference. response=`, response);
        error ? reject(error) : resolve(response);
      });
    });
  };

  getSendBirdChannel = channelURL => {
    // Given a string channelURL link, retrieves the channel from SendBird.
    return new Promise((resolve, reject) => {
      this.SENDBIRD.GroupChannel.getChannel(channelURL, function (groupChannel, error) {
        if (error) {
          return;
        }
        error ? reject(error) : resolve(groupChannel);
      });
    });
  };

  createChannelEventHandler = channelId => {
    // Given a string channelId identifier, retrieves an event handler from SendBird.
    return new Promise((resolve, reject) => {
      console.log(`ran createChannelEventHandler`);
      const handler = new this.SENDBIRD.ChannelHandler();
      this.SENDBIRD.addChannelHandler(channelId, handler);
      resolve(handler);
    });
  };

  removeChannelHandler = channelId => {
    this.SENDBIRD.removeChannelHandler(channelId);
  };

  postMessageToChannel = (message, channelURL) => {
    // Given a string message and a channelURL string, posts the message to the channel corresponding to the channelURL.
    console.log(`sendbird. postMessage. message=`, message);
    return new Promise((resolve, reject) => {
      this.SENDBIRD.GroupChannel.getChannel(channelURL, (groupChannel, error) => {
        groupChannel.sendUserMessage(message.message, function (message, error) {
          console.log(`sendbird. postMessage after sendUserMessage. message=`, message);
          console.log(`sendbird. postMessage after sendUserMessage. error=`, error);
          error ? reject(error) : resolve(message);
        });
      });
    });
  };

  // Add channelURL to relevant callers
  getMessageList = channelURL => {
    // Given a string channelURL, retrieves the current messageList from SendBird.
    console.log(`in MessageList. channelURL`, channelURL);
    return new Promise((resolve, reject) => {
      this.SENDBIRD.GroupChannel.getChannel(channelURL, function (groupChannel, error) {
        console.log(`in getMessageList. groupChannel=`, groupChannel);
        if (!groupChannel.previousMessageQuery) {
          groupChannel.previousMessageQuery = groupChannel.createPreviousMessageListQuery();
        }
        if (groupChannel.previousMessageQuery.hasMore &&
          !groupChannel.previousMessageQuery.isLoading) {
          groupChannel.previousMessageQuery.load(50, false, (messageList, error) => {
            console.log(`sendbird. getMessageList. messageList=`, messageList);
            error ? reject(error) : resolve(messageList);
          });
        } else {
          resolve([]);
        }
      });
    });
  };

  leaveSendBirdChannel = channelURL => {
    // Given a string channelURL, has user leave channel corresponding to the channelURL.
    console.log(`sendbird. leaveSendBirdChannel.`);
    this.SENDBIRD.GroupChannel.getChannel(channelURL, function (groupChannel, error) {
      groupChannel.leave(function (response, error) {
        console.log(`sendbird. leaveSendBirdChannel. response=`, response);
        if (error) {
          console.log(error);
          return;
        }
      });
    });
  };

  exitSendBird = () => {
    // Disconnects this sendBird instance from the SendBird application.
    console.log(`sendbird. exitSendBird (connection removed, still initialized).`);
    this.SENDBIRD.disconnect();
  };

  static getInstance() {
    return new SendBirdAction();
  }
}

export default SendBirdAction;

/* Possible use.
Retrieve members online status in an open channel
To stay updated on each member's connection status, call refresh() before calling members of a group channel object. You can then get
each of the users' connection statuses by checking user.getConnectionStatus.

By using user.connectionStatus at each User object in the returned list, you can check user's current connection status. The connectionStatus
has one of the following three values:

nonavailable: user's status information cannot be reached.
offline: user is disconnected from SendBird.
online: user is connected to SendBird.
*/
