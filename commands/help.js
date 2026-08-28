const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h', 'commands'],
    execute: async (message, args) => {
        try {
            const prefix = message.client.prefix || '.';

            // 1. Define your beautiful formatted contents
            const mainText = `Welcome to the utility center! Select a category below to navigate.\n\n` +
                `**Core Commands:**\n` +
                `┃ \`${prefix}help\` *(h, commands)* — Opens this interactive utility interface\n` +
                `┃ \`${prefix}ping\` — Check the current live connection latency`;

            const utilityText = `Welcome to the utility center! Select a category below to navigate.\n\n` +
                `**Profile Tools:**\n` +
                `┃ \`${prefix}avatar\` *(av)* — View and download high-resolution profile pictures\n` +
                `┃ \`${prefix}banner\` *(bn, bnr)* — Inspect and download user background banners`;

            const contents = {
                help_main: mainText,
                help_utilities: utilityText
            };

            // 2. Build out payload structures using rich Embeds
            const buildV2Payload = (selectedKey = 'help_main', disabled = false) => {
                const placeholders = {
                    help_main: 'Core Utilities',
                    help_utilities: 'Profile Inspector'
                };

                const titles = {
                    help_main: '⚙️ Alexis Core Utilities',
                    help_utilities: '🖼️ Alexis Profile Inspector'
                };

                // Create the embed visual container block
                const helpEmbed = new EmbedBuilder()
                    .setColor('#89CFF0') 
                    .setTitle(titles[selectedKey])
                    .setDescription(contents[selectedKey]);

                return {
                    flags: 32768, // Added your flag configuration property back
                    embeds: [helpEmbed], 
                    components: [
                        {
                            type: 1, // ActionRow
                            components: [
                                {
                                    type: 3, // String Select Menu Component
                                    custom_id: 'help_select_menu',
                                    placeholder: placeholders[selectedKey],
                                    disabled: disabled,
                                    options: [
                                        {
                                            label: 'Core Utilities',
                                            description: 'View bot core and latency configuration',
                                            value: 'help_main',
                                            emoji: { id: null, name: '⚙️' },
                                            default: selectedKey === 'help_main'
                                        },
                                        {
                                            label: 'Profile Inspector',
                                            description: 'View avatar and profile background banners',
                                            value: 'help_utilities',
                                            emoji: { id: null, name: '🖼️' },
                                            default: selectedKey === 'help_utilities'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                };
            };

            // 3. Send initial menu using reply
            const initialMessage = await message.reply(buildV2Payload('help_main', false));

            // 4. Create the menu collection listener loop
            const collector = initialMessage.createMessageComponentCollector({ time: 120000 });

            collector.on('collect', async (interaction) => {
                if (interaction.user.id !== message.author.id) {
                    return interaction.reply({ content: '❌ This menu is not for you!', ephemeral: true });
                }
                const selectedValue = interaction.values[0]; 
                await interaction.update(buildV2Payload(selectedValue, false));
            });

            collector.on('end', async () => {
                try {
                    const finalValue = collector.collected.last()?.values[0] || 'help_main';
                    await initialMessage.edit(buildV2Payload(finalValue, true));
                } catch (err) {}
            });

        } catch (error) {
            console.error('[HELP COMMAND ERROR]', error);
        }
    }
};
