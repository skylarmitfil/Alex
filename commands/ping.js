module.exports = {
    name: 'ping',
    async execute(message) {
        // This will show the lowest ping possiable for your bot.
        const wsPing = message.client.ws.ping;
        
        // This is what the bot will respond with.
        await message.reply(`🏓 Pong! here's my ping **${wsPing}ms**`);
    },
};
