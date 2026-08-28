require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Events, Collection } = require('discord.js');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

// Create a collection to store your prefix commands
client.commands = new Collection();

// Read all files inside the commands folder
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    
    // Store the command using its name configuration
    if ('name' in command && 'execute' in command) {
        client.commands.set(command.name, command);
    }
}

const PREFIX = '.';

client.once(Events.ClientReady, (readyClient) => {
    console.log(`${readyClient.user.tag} is now ONLINE!`);
});

// Listen for prefix text commands
client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return;

const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Dynamically grab the command from our collection
    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        await command.execute(message);
    } catch (error) {
        console.error(error);
        await message.reply('There was an error executing that command!');
    }
});

client.login(process.env.DISCORD_TOKEN);
