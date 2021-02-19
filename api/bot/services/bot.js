const client = require("../../../config/discord/client");
const { MessageEmbed } = require("discord.js");

module.exports = {
  // KEEP FOR FUTURE FEATURES
  // generateInviteLink: async () => {
  //   try {
  //     const channel = await client.channels.fetch(DISCORD_GENERAL_CHANNEL_ID);

  //     return channel
  //       .createInvite({ unique: true, maxUses: 1 })
  //       .then((invite) => {
  //         return JSON.stringify(invite);
  //       })
  //       .catch((error) => {
  //         return error;
  //       });
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // },

  sendBlogPostToDiscord: async (channelId, message) => {
    if (!message) {
      return "Please include a message to send to the channel";
    }
    if (!channelId) {
      return "Please include the id of the channel that you like to send a message to";
    }

    try {
      const sendChannel = await client.channels.cache.find(
        (channel) => channel.id === channelId
      );

      const embed = new MessageEmbed()
        .setColor("#0d46a0")
        .setTitle(message.title)
        .setURL(message.url)
        .setAuthor(message.author)
        .setDescription(message.description)
        .setImage(message.thumbnail);

      sendChannel.send(embed);
      return "sent";
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  // KEEP FOR FUTURE FEATURES
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
