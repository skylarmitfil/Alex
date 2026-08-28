module.exports = {
    name: 'avatar',
    async execute(message) {
        // 1. Get the first mentioned user, or default to the person who sent the message
        const user = message.mentions.users.first() || message.author;

        // 2. Fetch the highest resolution image link (including animated GIFs if applicable)
        const avatarUrl = user.displayAvatarURL({ size: 1024, dynamic: true });

        // 3. Reply back directly with the image link
        await message.reply(`🖼️ **${user.username}'s Avatar:**\n${avatarUrl}`);
    },
};
