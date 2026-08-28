module.exports = {
    name: 'help',
    async execute(message) {
        // Get all command names from the bot's collection
        const commandsList = message.client.commands.map(cmd => `\`.${cmd.name}\``).join(', ');
        
        await message.reply(`📜 **Available Commands:**\n${commandsList}`);
    },
};
