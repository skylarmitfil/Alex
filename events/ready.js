const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true, // This event only runs once when the bot boots
    execute(readyClient) {
// You can change the "is Available" this is ony for your log.
        console.log(`${readyClient.user.tag} is Avaliable.`);

        // You can freely pick these or change them around.
        const statusOptions = [
            { name: ' With Fire', type: ActivityType.Playing },
            { name: 'To You', type: ActivityType.Listening },
            { name: 'For My Commands', type: ActivityType.Watching },
            { name: 'for bugs', type: ActivityType.Competing }
        ];

        let counter = 0;

        // Set the initial presence immediately on boot
        readyClient.user.setPresence({
            activities: [statusOptions[0]],
            status: 'dnd'
        });

        // Loop changes the status message every 15 seconds
        setInterval(() => {
            counter = (counter + 1) % statusOptions.length;
            
            readyClient.user.setPresence({
                activities: [statusOptions[counter]],
                status: 'dnd'
            });
        }, 15000);
    },
};
