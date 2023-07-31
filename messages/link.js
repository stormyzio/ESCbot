var { userCodes, cancel } = require('../index')
const Discord = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const colors = require('colors')
const axios = require('axios')

let link = message => {
  userCodes.set(message.author.id, {
    message: message,
    author: message.author
  });

  let confirm = new ButtonBuilder()
    .setCustomId('confirm')
    .setLabel('Commencer')
    .setStyle(ButtonStyle.Primary);

  let row = new ActionRowBuilder()
    .addComponents(cancel, confirm);

  message.reply({
    content: '**Commençons le lien de ton compte Exoracer à Discord, ' + message.author.toString() + '**',
    components: [row]
  })
}

module.exports = link