const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h', 'commands'],
    execute: async (message, args) => {
        try {
            const prefix = message.client.prefix || '.';

            // 1. Define your modern text blocks
            const mainText = `### Alexis Command Menu\n` +
                `Welcome to the utility center! Select a category below to navigate.\n\n` +
                `**Core Commands:**\n` +
                `┃ \`${prefix}help\` *(h, commands)* — Opens this interactive utility interface\n` +
                `┃ \`${prefix}ping\` — Check the current live connection latency`;

            const utilityText = `### Alexis Command Menu\n` +
                `Welcome to the utility center! Select a category below to navigate.\n\n` +
                `**Profile Tools:**\n` +
                `┃ \`${prefix}avatar\` *(av)* — View and download high-resolution profile pictures\n` +
                `┃ \`${prefix}banner\` *(bn, bnr)* — Inspect and download user background banners`;

            const contents = {
                help_main: mainText,
                help_utilities: utilityText
            };

            // 2. Build out your raw component payload structures
            const buildV2Payload = (selectedKey = 'help_main', disabled = false) => {
                const placeholders = {
                    help_main: 'Core Utilities',
                    help_utilities: 'Profile Inspector'
                };

                return {
                    components: [
                        {
                            type: 17, // Modern Container Component frame
                            accent_color: 9031664, // Hex #89CFF0 in decimal
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
                                },
                                {
                                    type: 14 // Visual Layout Line Separator
                                },
                                {
                                    type: 10, // Modern Native TextDisplay component
                                    content: contents[selectedKey]
                                }
                            ] // Fixed syntax here (removed rogue character)
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
                const selectedValue = interaction.values[0]; // Fixed to extract the first string element from the array
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
