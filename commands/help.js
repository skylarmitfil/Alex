module.exports = {
    name: 'help',
    aliases: ['h', 'commands'],
    execute: async (message, args) => {
        try {
            const prefix = message.client.prefix || '.';

            // 1. Your clean, modern markdown text blocks
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

            // 2. Build out the pure V2 Components structure
            const buildV2Payload = (selectedKey = 'help_main', disabled = false) => {
                const placeholders = {
                    help_main: 'Core Utilities',
                    help_utilities: 'Profile Inspector'
                };

                return {
                    // Discord enforces this flag to use Type 17 and Type 10 components
                    flags: 32768, 
                    components: [
                        {
                            type: 17, // The modern native visual Container frame
                            accent_color: 9031664, // Hex #89CFF0 translated to base-10 integer decimal
                            components: [
                                {
                                    type: 1, // ActionRow holding the interactive select menu
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
                                    type: 14 // Native horizontal separator rule line
                                },
                                {
                                    type: 10, // TextDisplay component replacing the legacy embed body
                                    content: contents[selectedKey]
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
                const selectedValue = interaction.values[0]; // Access string index safely
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
