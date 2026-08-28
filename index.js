require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Changed 'ready' to Events.ClientReady to fix the warning
client.once(Events.ClientReady, (readyClient) => {
    console.log(`${readyClient.user.tag} is now ONLINE!`);
});

client.login(process.env.DISCORD_TOKEN);
