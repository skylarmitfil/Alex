module.exports = {
    name: 'ping',
    async execute(message) {
        // Calculate the WebSocket ping
        const wsPing = message.client.ws.ping;
        
        // Reply to the text message
        await message.reply(`🏓 Pong! here's my ping **${wsPing}ms**`);
    },
};
