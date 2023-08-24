var { userCodes, cancel } = require('../index')
const Discord = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const colors = require('colors')
const axios = require('axios')

let start = async interaction => {
  let confirm = new ButtonBuilder()
      .setCustomId('did')
      .setLabel('Je l\'ai fait !')
      .setStyle(ButtonStyle.Primary)
      .setDisabled(true)

    let row = new ActionRowBuilder()
      .addComponents(cancel, confirm);

    let res = await axios({
      method: 'get',
      url: 'https://exostats.nl/?login'
    })
    let firstPart = JSON.stringify(res.data).split('<strong id=secretcode>')[1].split('<span')[0]
    let secondPart = JSON.stringify(res.data).split('</span>')[1].split('</strong>')[0]
    code = firstPart + '' + secondPart
    let fancyCode = firstPart + ' ' + secondPart

    await interaction.update({ content: `**Je t\'ai envoyé un message en MP, ${interaction.user}**`, components: [] })

    let image = new AttachmentBuilder('../discord-bot-exolink/exoscreen.png', {
      name: 'exoscreen.png',
      description: 'help screen'
    })

    let sentMessage = await interaction.user.send({ 
      content: 
      `**${interaction.user} Très bien, voici ton code secret: ${fancyCode}** \n **Tu dois le rentrer dans Exoracer ( settings -> account / manage -> other )** \n **Mets-le dans la catégorie Exostats et clique sur "link account".**`, 
      components: [row],
      files: [image]
    });

    userCodes.set(interaction.user.id, code)

    setTimeout(async () => {

      let confirm = new ButtonBuilder()
        .setCustomId('did')
        .setLabel('Je l\'ai fait !')
        .setStyle(ButtonStyle.Primary)
      

      let row = new ActionRowBuilder()
        .addComponents(cancel, confirm);
      
      await sentMessage.edit({ components: [row] })
    }, 1000)
}

module.exports = start