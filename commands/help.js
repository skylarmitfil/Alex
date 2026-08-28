const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h', 'commands'], // Useful shortcuts for users
    async execute(message) {
        // 1. Map through each command to display both its name and its aliases
        const commandsList = message.client.commands.map(cmd => {
            const aliasTxt = cmd.aliases && cmd.aliases.length > 0 
                ? ` *(${cmd.aliases.join(', ')})*` 
                : '';
            return `\`${message.client.prefix}${cmd.name}\`${aliasTxt}`;
        }).join('\n');

        // 2. Create the beautiful light blue embed
        const helpEmbed = new EmbedBuilder()
            .setColor('#89CFF0') // Your signature light blue accent color
            .setTitle('Available Commands')
            .setDescription(commandsList || 'No commands loaded.');

        // 3. Reply back directly with the card
        await message.reply({ embeds: [helpEmbed] });
    },
};
