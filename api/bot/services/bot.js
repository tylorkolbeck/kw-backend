const client = require("../../../config/discord/client");
const GUILD_ID = process.env.DISCORD_GUILD_ID;
const DISCORD_GENERAL_CHANNEL_ID = process.env.DISCORD_GENERAL_CHANNEL_ID;

module.exports = {
  generateInviteLink: async () => {
    try {
      const channel = await client.channels.fetch(DISCORD_GENERAL_CHANNEL_ID);

      return channel
        .createInvite({ unique: true, maxUses: 1 })
        .then((invite) => {
          return JSON.stringify(invite);
        })
        .catch((error) => {
          return error;
        });
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  sendBlogPostToDiscord: async (channelName, message) => {
    // if (!message) {
    //   return "Please include a message to send to the channel"
    // }
    // if (!channelName) {
    //   return "Please include the name of the channel that you like to message"
    // }

    try {
      const sendChannel = await client.channels.cache.find(
        (channel) => channel.name === channelName
      );

      if (!sendChannel) {
        return `Channel ${channelName} was not found on your server`;
      }

      sendChannel.send(message);
      return "sent";
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  // sendDiscordMessage: async (ctx) => {
  //   const { channelName, message } = req.body;

  //   if (!message) {
  //     return "Please include a message to send to the channel"
  //   }
  //   if (!channelName) {
  //     return "Please include the name of the channel that you like to message"
  //   }

  //   try {
  //     const sendChannel = client.channels.cache.find(
  //       (channel) => channel.name === channelName
  //     );
  //     if (!sendChannel) {
  //       return res.send(`Channel ${channelName} was not found on your server`);
  //     }

  //     sendChannel.send(message);
  //     return "No channel provided";
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // },
};
