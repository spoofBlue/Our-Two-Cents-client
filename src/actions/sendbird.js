import SendBird from "sendbird";

let SENDBIRD;
let GROUP_CHANNEL;
let CHANNEL_HANDLER;

export const initializeSendBird = () => {
  console.log(`sendbird. initializeSendBird`);
  SENDBIRD = new SendBird({ appId: "BDEEA390-7760-4E15-8C9B-06C311285004" });
};

export const accessSendBird = (userId, username = "Anonymous ?") => {
  SENDBIRD.connect(userId, function (user, error) {
    const nickname = username;
    if (error) {
      return;
    } else {
      SENDBIRD.updateCurrentUserInfo(nickname, null, (user, error) => {
        if (error) {
          return;
        }
        return user;
      });
    }
  });
};

export const createSendBirdChannel = conversationData => {
  let params = new SENDBIRD.GroupChannelParams();
  params.isPublic = false;
  params.isEphemeral = false;
  params.isDistinct = false;
  params.addUserIds([
    conversationData.hostUserId,
    conversationData.guestUserId
  ]);
  params.operators = []; //No one will be allowed to ban, mute, or delete comments in the chat.
  params.name = conversationData.topicName;
  //params.coverImage = FILE;
  //params.coverUrl = COVER_URL;
  //params.customType = CUSTOM_TYPE;
  params.data = {
    hostUsername: conversationData.hostUsername,
    guestUsername: conversationData.guestUsername
  };

  return new Promise((resolve, reject) => {
    SENDBIRD.GroupChannel.createChannel(params, function (groupChannel, error) {
      GROUP_CHANNEL = groupChannel;
      error ? reject(error) : resolve(groupChannel);
    });
  });
};

export const inviteToSendBirdChannel = conversationData => {
  // Do after createSendBirdChannel
  let userIds = [conversationData.hostUserId, conversationData.guestUserId];

  return new Promise((resolve, reject) => {
    GROUP_CHANNEL.inviteWithUserIds(userIds, function (response, error) {
      error ? reject(error) : resolve(response);
    });
  });
};

export const setSendBirdChannelPreference = () => {
  let autoAccept = true; // If true, a user will automatically join a group channel with no choice of accepting and declining an invitation.
  return new Promise((resolve, reject) => {
    SENDBIRD.setChannelInvitationPreference(autoAccept, function (
      response,
      error
    ) {
      error ? reject(error) : resolve(response);
    });
  });
};

export const getSendBirdChannel = channelURL => {
  return new Promise((resolve, reject) => {
    SENDBIRD.GroupChannel.getChannel(channelURL, function (groupChannel, error) {
      if (error) {
        return;
      }
      GROUP_CHANNEL = groupChannel;
      error ? reject(error) : resolve(groupChannel);
    });
  });
};

export const createChannelEventHandler = channelId => {
  return new Promise((resolve, reject) => {
    CHANNEL_HANDLER = new SENDBIRD.ChannelHandler();
    /*
        CHANNEL_HANDLER.onMessageReceived = (channel, message) => {
            console.log(`sendbird. in createChannel's onMessageReceived. channel=`, channel);
            console.log(`sendbird. in createChannel's onMessageReceived. message=`, message);
            if (this.onMessageReceived) {
              this.onMessageReceived(channel, message);
            }
            return channel;
        };
        CHANNEL_HANDLER.onMessageUpdated = (channel, message) => {
            console.log(`sendbird. in createChannel's onMessageUpdated. channel=`, channel);
            console.log(`sendbird. in createChannel's onMessageUpdated. message=`, message);
            if (this.onMessageUpdated) {
              this.onMessageUpdated(channel, message);
            }
            return channel;
        };
        */
    SENDBIRD.addChannelHandler(channelId, CHANNEL_HANDLER);
    resolve(CHANNEL_HANDLER);
  });
};

export const getChannelEventHandler = () => {
  if (CHANNEL_HANDLER) {
    return CHANNEL_HANDLER;
  }
};

export const removeChannelHandler = channelId => {
  SENDBIRD.removeChannelHandler(channelId);
};

export const postMessageToChannel = (message, username) => {
  // !!! Currently not using username.
  return new Promise((resolve, reject) => {
    GROUP_CHANNEL.sendUserMessage(message.message, function (message, error) {
      console.log(`sendbird. postMessage after sendUserMessage. error=`, error);
      error ? reject(error) : resolve(message);
    });
  });
};

export const addMessageToList = (messageList, message) => { };

export const getMessageList = () => {
  return new Promise((resolve, reject) => {
    if (!GROUP_CHANNEL.previousMessageQuery) {
      GROUP_CHANNEL.previousMessageQuery = GROUP_CHANNEL.createPreviousMessageListQuery();
    }
    if (
      GROUP_CHANNEL.previousMessageQuery.hasMore &&
      !GROUP_CHANNEL.previousMessageQuery.isLoading
    ) {
      GROUP_CHANNEL.previousMessageQuery.load(
        50,
        false,
        (messageList, error) => {
          error ? reject(error) : resolve(messageList);
        }
      );
    } else {
      resolve([]);
    }
  });
};

export const messageRecievedEvent = () => {
  CHANNEL_HANDLER.onMessageReceived(function (channel, message) {
    console.log(`sendbird. messageReceivedEvent. channel=`, channel);
    console.log(`sendbird. messageReceivedEvent. channel=`, message);
    //return message;
  });
};

export const leaveSendBirdChannel = () => {
  if (GROUP_CHANNEL) {
    GROUP_CHANNEL.leave(function (response, error) {
      if (error) {
        return;
      }
    });
  }
};

export const exitSendBird = () => {
  SENDBIRD.disconnect();
};
