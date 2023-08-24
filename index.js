const Discord = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const colors = require('colors')
const axios = require('axios')

const client = new Discord.Client({ intents: [
  Discord.GatewayIntentBits.Guilds, 
  Discord.GatewayIntentBits.GuildMessages,
  Discord.GatewayIntentBits.MessageContent,
  Discord.GatewayIntentBits.DirectMessages,
  Discord.GatewayIntentBits.GuildPresences,
  Discord.GatewayIntentBits.GuildMembers
] });

require('dotenv').config()

console.clear()
console.log('... loading ...'.green)

client.on('ready', () => {
  setTimeout(() => {
    console.clear()
    console.log(`Started bot as ${client.user.username}!`.green.bold);
    console.log('prefix: '.bold + prefix.blue)
    console.log('')
    console.log('I\'m in ' + Array.from(client.guilds.cache).length.toString().yellow + ' server.')
  }, 1000)
});

let cancel = new ButtonBuilder()
  .setCustomId('cancel')
  .setLabel('Annuler')
  .setStyle(ButtonStyle.Secondary);

var userCodes = new Map(); 

const leagues = [
  [500,'Bronze III', '1135572683162144799'],
  [600, 'Bronze II', '1135572967544328272'],
  [750, 'Bronze I', '1135572683162144799'],
  [1000, 'Silver III', '1135573196742074409'],
  [1300, 'Silver II', '1135573167671345252'],
  [1600, 'Silver I', '1135573049450705007'],
  [2000, 'Gold III', '1135573287884304394'],
  [2300, 'Gold II', '1135573261548277840'],
  [2600, 'Gold I', '1135573226844602549'],
  [3000, 'Diamond III', '1135573422445957281'],
  [3500, 'Diamond II', '1135573370667286639'],
  [4000, 'Diamond I', '1135573315864514651'],
  [5000, 'Master III', '1135573638616203376'],
  [6000, 'Master II', '1135573574271385703'],
  [8000, 'Master I', '1135573510744445019'],
  [10000, 'Grandmaster III', '1135573899166359614'],
  [12000, 'Grandmaster II', '1135573797521596516'],
  [15000, 'Grandmaster I', '1135573665598144597'],
  [20000, 'Professional', '1135573969840373810'],
]

module.exports = {
  userCodes: userCodes,
  cancel: cancel,
  leagues: leagues
}

var prefix = 'e/'

const link = require('./messages/link')
const endID = require('./messages/id')
const start = require('./buttons/start')
const did = require('./buttons/did')

client.on('messageCreate', async message => {
  if(!message.author.bot) {
    if(message.content.toLowerCase().startsWith(prefix)) {
      console.log('yes')
      message.content.toLowerCase() === prefix + 'link' ? link(message) : 
      message.content.toLowerCase() === prefix + 'exostats' ? message.reply('**Exostats:** \n\n:link: **Main Page: https://exostats.nl** \n:link: **Player Score: https://exostats.nl/rank/playerscore** \n:link: **EWC: https://exostats.nl/ewc**') : 
      message.content.toLowerCase().startsWith(prefix + 'id ') ? endID(message) :
      message.content.toLowerCase() === prefix + 'm' ? createMembersRoom(message) : () => {}
    } else {
      if(message.content.toLowerCase().includes('greg')) {
        message.reply('wsh tu m\'veux quoi')
      }
    }
  }
})

async function createMembersRoom(message) {
  console.log('/members')
  let guild = message.guild
  let categorie = guild.channels.cache.get('1144209888885616670')

  let users = await guild.members.fetch()
  let members = Array.from(users.filter(m => m._roles.includes('1065755940734910524'))).length

  let channel = await guild.channels.create({
    name: 'Members: ' + members,
    type: Discord.ChannelType.GuildVoice,
    parent: categorie,
    permissionOverwrites: [
      {
          id: message.guild.roles.everyone, // Rôle @everyone
          deny: [Discord.PermissionsBitField.Flags.Connect]
      }
  ]
  })
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'confirm') { // Send to MP

    start(interaction)

  } else if (interaction.customId === 'cancel') { // Cancel

    await interaction.update({ content: '**Ok, on s\'arrête là.**', components: [], files: [] });

  } else if(interaction.customId === 'did') { // Added code to Exoracer

    did(interaction)

  } else if(interaction.customId === 'itsme') { // end

    let image = new AttachmentBuilder('../discord-bot-exolink/exoscreen.png', {
      name: 'exoscreen.png',
      description: 'help screen'
    })

    await interaction.update({ content: `${interaction.user}, \n **Dans un salon du serveur discord, écris:** \n \n e/id [ton identifiant exoracer ] \n \n **Exemple:** \n e/id AJizoLshdkJzijNndlOe \n \n *Tu peux trouver ton identifiant en bas des settings. ( Player ID )*`, components: [] });

  }

});

client.login(process.env.TOKEN);