
const embed = {
    title: '¡Your ticket has been closed!',
    description: 'Your support ticket has been closed, if you consider that the problem persists, please, open a new ticket.',
    color: 0x5865F2,
    image: {url: 'https://cdn.discordapp.com/attachments/1275758961676652619/1277918813224173641/wp2994584.png?ex=66ceea23&is=66cd98a3&hm=dbba29809938d7999475c06d224f5858890177b1d5b858c00e84235d76d1a23f&' }
}



async function main (interaction) {
    const {channel, guild} = interaction
    
    const ticket_owner = await guild.members.fetch(channel.topic)
    .catch (err => console.log(err))

    interaction.reply('- Closing ticket...')
    .then(() => {
        channel.delete();
        if(ticket_owner) ticket_owner.send({embeds: [embed]})
    })
}

module.exports = main;