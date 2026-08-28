const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h', 'commands'],
    async execute(message) {
        // Map through all registered commands safely without corrupted string formatting
        const commandsList = message.client.commands.map(cmd => {
            const aliasTxt = cmd.aliases && cmd.aliases.length > 0 
                ? ` *(${cmd.aliases.join(', ')})*` 
                : '';
            return `\`${message.client.prefix}${cmd.name}\`${aliasTxt}`;
        }).join('\n');

        const helpEmbed = new EmbedBuilder()
            .setColor('#89CFF0')
            .setTitle('Available Commands')
            .setDescription(commandsList || 'No commands loaded.');

        await message.reply({ embeds: [helpEmbed] });
    },
};
