var { userCodes } = require('../index')
const Discord = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const colors = require('colors')
const axios = require('axios')

let did = async interaction => {
  let res2 = await axios({
    method: 'get',
    url: `https://exostats.nl/?login&nohtml&code=${userCodes.get(interaction.user.id)}`,
  })

  if(res2.data.includes('expired')) {
    console.log('error')
    await interaction.update({
      content: '**Il y a eu une erreur. Tu as peut-etre oublié de mettre le code dans Exoracer. \n Si tu es sur de l\'avoir mis, contacte "myzh" sur Discord.**', components: [], files: []
    })
  } else {
    let session = res2.data.split('=')[1]

    let res3 = await axios({
      method: 'get',
      url: `https://exostats.nl/?login&success`,
      headers: {
          'Cookie': 'exoses=' + session
      }
    })

    userCodes.set(interaction.user.id, {
      message: userCodes.get(interaction.user.id).message,
      author: userCodes.get(interaction.user.id).author,
      session: session
    })

    let username = res3.data.split('Welcome, ')[1].split('!')[0]

    let confirm = new ButtonBuilder()
        .setCustomId('itsme')
        .setLabel('Oui c\'est moi')
        .setStyle(ButtonStyle.Primary);

    let cancel = new ButtonBuilder()
        .setCustomId('cancel')
        .setLabel('Non, il y a une erreur')
        .setStyle(ButtonStyle.Secondary);

    let row = new ActionRowBuilder()
      .addComponents(cancel, confirm)

    await interaction.update({ content: `${interaction.user}, **Es-tu ${username} sur Exoracer ?**`, components: [row], files: [] });
  }
}

module.exports = did