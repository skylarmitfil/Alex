module.exports = {
    name: 'avatar',
    aliases: ['av'],
    async execute(message) {
        // Grab the mentioned user's avatar, or default to the author
        const user = message.mentions.users.first() || message.author;
        
        // Fetch the highest resolution image link (including animated GIFs)
        const avatarUrl = user.displayAvatarURL({ size: 1024, dynamic: true }); 
        
        // Reply back directly with the image link
        await message.reply(`**${user.username}'s Avatar:**\n${avatarUrl}`);
    },
};
