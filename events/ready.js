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

        // only change "status:" discords options are 'online', 'idle', 'dnd', or 'invisible'.
        readyClient.user.setPresence({
            activities: [statusOptions[0]],
            status: 'dnd'
        });

        setInterval(() => {
            counter = (counter + 1) % statusOptions.length;
// Make sure the status below is the same as the one above.            
            readyClient.user.setPresence({
                activities: [statusOptions[counter]],
                status: 'dnd'
            });
        }, 15000);
    },
};
 // the '15000' is in milliseconds(ms)
// if you want it to change faster for a test do "10000 - 15000" - every 10 seconds or 15 seconds - 
// if you want it to change less do something like "1800000" - every 30 minutes.