module.exports = {
    name: 'avatar',
    async execute(message) {
        // This will grab the user mentioned avatar,  or it'll default back to author
        const user = message.mentions.users.first() || message.author;

        // 2. Fetch the highest resolution image link (including animated GIFs if applicable)
        const avatarUrl = user.displayAvatarURL({ size: 1024, dynamic: true });

        // 3. Reply back directly with the image link
        await message.reply(`🖼️ **${user.username}'s Avatar:**\n${avatarUrl}`);
    },
};
