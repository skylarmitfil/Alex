const { Events } = require('discord.js');
const PREFIX = '.';

module.exports = {
    name: Events.MessageCreate,
    once: false, // Runs every time a message is sent
    async execute(message) {
        // Ignore messages from bots or those without the prefix
        if (message.author.bot || !message.content.startsWith(PREFIX)) return;

        const args = message.content.slice(PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // FIX: Look up by main name OR search inside the aliases array
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        try {
            await command.execute(message, args);
        } catch (error) {
            console.error(error);
            await message.reply('There was an error executing that command!');
        }
    },
};
