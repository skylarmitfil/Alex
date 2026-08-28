const { EmbedBuilder } = require('discord.js');

module.exports = { 
    name: 'avatar', 
    aliases: ['av'], 
    async execute(message) { 
        // 1. Grab the user mentioned, or default back to the author 
        const user = message.mentions.users.first() || message.author; 

        // 2. Fetch the highest resolution image links
        const pngUrl = user.displayAvatarURL({ size: 1024, dynamic: true, extension: 'png' });
        const jpgUrl = user.displayAvatarURL({ size: 1024, dynamic: true, extension: 'jpg' });
        const webpUrl = user.displayAvatarURL({ size: 1024, dynamic: true, extension: 'webp' });
        const gifUrl = user.avatar && user.avatar.startsWith('a_') 
            ? user.displayAvatarURL({ size: 1024, dynamic: true, extension: 'gif' }) 
            : null;

        // 3. Build out the standard image display link
        const avatarUrl = user.displayAvatarURL({ size: 1024, dynamic: true });

        // 4. Create the embed structure with light blue color
        const avatarEmbed = new EmbedBuilder()
            .setColor('#89CFF0') // Light Blue Hex Code
            .setTitle(`${user.username}'s Avatar`)
            .setDescription(`**Links:** [PNG](${pngUrl}) | [JPG](${jpgUrl}) | [WEBP](${webpUrl})${gifUrl ? ` | [GIF](${gifUrl})` : ''}`)
            .setImage(avatarUrl)
            .setFooter({ 
                text: `Requested by ${message.author.username}`, 
                iconURL: message.author.displayAvatarURL({ dynamic: true }) 
            });

        // 5. Send the embedded card frame directly back
        await message.reply({ embeds: [avatarEmbed] }); 
    }, 
};
