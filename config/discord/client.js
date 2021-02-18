const { Client, Intents } = require("discord.js");
// Keep these comments here for future feature where
// the bot may want to control the users in discord
// so that it can have access to the entire dicord
// memberlist.

// let intents = new Intents(Intents.NON_PRIVILEGED);
// intents.add("GUILD_MEMBERS");

// const client = new Client({ ws: { intents: intents } });
const client = new Client();

client.once("ready", async () => {
  console.log("Bot standing by for your commands...");
});

client.login(process.env.DISCORD_TOKEN);

module.exports = client;
