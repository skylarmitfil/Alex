module.exports = {
    name: 'help',
    async execute(message) {
        // This Will Get All Of Your Bots Commands.
        const commandsList = message.client.commands.map(cmd => `\`.${cmd.name}\``).join(', ');
        
        await message.reply(`📜 **Available Commands:**\n${commandsList}`);
    },
};
