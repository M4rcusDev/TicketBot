const Discord = require("discord.js")
const moderationRole = 'ID_ROLE' // The id of the role that can see the ticket (owner, helper, staff)
const guildCategoryId = 'CATEGORY_ID' // The category of the role where you want the tickets to be created

const ticketCloseButton = new Discord.ActionRowBuilder().addComponents(
    new Discord.ButtonBuilder()
    .setCustomId('ticket-close')
    .setLabel("Close ticket")
    .setStyle(2)
    .setEmoji('🔒')
)

const embed = {
   title: 'Support',
    description: 'Our administrators will help you soon.\nTo close the ticket, press the button below. 🔒',
    color: 0x5865F2
}



async function main (interaction) {
const {user, guild} = interaction;
const ticketType = interaction.values[0];

const tickets = guild.channels.cache.filter(channel => channel.parentId === guildCategoryId)
if(tickets.some(ticket => ticket.topic === user.id)) return interaction.reply({content: 'You already have a ticket created.', ephemeral: true})

// Si no tiene tickets
interaction.reply({content: '- Your ticket is being closed...', ephemeral: true})
.then(() =>  {
    guild.channels.create({
        name: ticketType+'-'+user.username.slice(0, 25-ticketType.length),
        topic: user.id,
        type: Discord.ChannelType.GuildText,
        parent: guildCategoryId,
        permissionOverwrites: [
            {id: interaction.guild.roles.everyone, deny: [Discord.PermissionsBitField.Flags.ViewChannel]},
            {id: moderationRole, allow: [Discord.PermissionsBitField.Flags.ViewChannel]},
            {id: interaction.user.id, allow: [Discord.PermissionsBitField.Flags.ViewChannel]}

]




    }).then(channel => {
        interaction.editReply({content: `- Tu ticket ha sido creado: ${channel}`});
        channel.send({
           content: `Bievenido ${user}, nuestros <@&1199804743522992150> te atenderan en un momento.`,
           components: [ticketCloseButton],
           embeds: [embed]
  
  
  
  
  
        })
})
 
});

}

module.exports = main;