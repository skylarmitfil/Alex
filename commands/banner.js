const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'banner',
    aliases: ['bn', 'bnr'], // Added both aliases here
    async execute(message) {
        const user = message.mentions.users.first() || message.author;
        
        try {
            // Force fetch the full profile to get banner and accent color data
            const fullUser = await message.client.users.fetch(user.id, { force: true });
            
            // Get their personal profile accent color, fallback to your light blue theme if they don't have one
            const embedColor = fullUser.hexAccentColor || '#89CFF0';

            // IF THE USER HAS NO BANNER:
            if (!fullUser.banner) {
                const noBannerEmbed = new EmbedBuilder()
                    .setColor(embedColor)
                    .setTitle(`${user.username}'s Banner`)
                    .setDescription('This user does not have a profile banner set.');

                return message.reply({ embeds: [noBannerEmbed] });
            }

            // IF THE USER HAS A BANNER:
            const bannerUrl = fullUser.bannerURL({ size: 1024, dynamic: true });
            const pngUrl = fullUser.bannerURL({ size: 1024, dynamic: true, extension: 'png' });
            const jpgUrl = fullUser.bannerURL({ size: 1024, dynamic: true, extension: 'jpg' });
            const webpUrl = fullUser.bannerURL({ size: 1024, dynamic: true, extension: 'webp' });
            const gifUrl = fullUser.banner.startsWith('a_') 
                ? fullUser.bannerURL({ size: 1024, dynamic: true, extension: 'gif' }) 
                : null;

            const bannerEmbed = new EmbedBuilder()
                .setColor(embedColor) 
                .setTitle(`${user.username}'s Banner`)
                .setDescription(`**Links:** [PNG](${pngUrl}) | [JPG](${jpgUrl}) | [WEBP](${webpUrl})${gifUrl ? ` | [GIF](${gifUrl})` : ''}`)
                .setImage(bannerUrl);

            await message.reply({ embeds: [bannerEmbed] });

        } catch (error) {
            console.error('Error fetching banner:', error);
            await message.reply('There was an error trying to fetch that banner!');
        }
    },
};
