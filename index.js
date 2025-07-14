const Discord = require("discord.js")
const {ActivityType} = require("discord.js")
const Client = new Discord.Client({
    intents: 3276799
})

const embed = {
    title: 'Support Panel.',
    description: 'To open a ticket, press the menu below and select which option you want!',
    color: 0x5865F2,
    image: {url: 'https://cdn.discordapp.com/attachments/1275758961676652619/1277918813224173641/wp2994584.png?ex=66ceea23&is=66cd98a3&hm=dbba29809938d7999475c06d224f5858890177b1d5b858c00e84235d76d1a23f&'}
}

const menu = new Discord.ActionRowBuilder().addComponents(
    new Discord.StringSelectMenuBuilder()
    .setPlaceholder("Open support ticket.")
    .setMaxValues(1)
    .setMinValues(1)
    .setCustomId("ticket-create")
    .setOptions([{
        label: 'support',
        emoji: '👮',
        description: 'Open a support ticket!',
        value: 'support'
    }, {
        label: 'Report',
        emoji: '🕵️',
        description: 'Report an user.',
        value: 'report'

    }, {
       label: 'Giveaway',
       emoji: '📣',
       description: 'Claim a giveaway perk!',
       value: 'giveaway'


    
    }])
);


Client.on('interactionCreate', async (interaction) => {
    if(interaction.isChatInputCommand()) return;

    try {
        const execute = require(`./interactions/${interaction.customId}`)
        execute(interaction)
    } catch (error) {
        console.log("[ERR] Interaction Failed.")
    }
})


Client.on('ready', async (client) => {
    console.log(`Client connected as ${client.user.username}!`)
    client.user.setActivity('Made by: `imarcus.dev` 💻', { type: ActivityType.Playing });
    const ticketPanelChannelId = "CHANNEL_ID"; // The channel you want to send the embed menu.
    client.channels.fetch(ticketPanelChannelId)
    .then(channel => channel.send({embeds: [embed], components: [menu]}))
});


Client.login("TOKEN_OF_YOUR_BOT")