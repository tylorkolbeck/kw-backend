const { Client, Intents } = require("discord.js");
// let intents = new Intents(Intents.NON_PRIVILEGED);
// intents.add("GUILD_MEMBERS");

// const client = new Client({ ws: { intents: intents } });
const client = new Client();

client.once("ready", async () => {
  console.log("Bot standing by for your commands...");
});

client.login(process.env.DISCORD_TOKEN);

module.exports = client;
