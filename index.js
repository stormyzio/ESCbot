const Discord = require('discord.js');

const colors = require('colors')

const fs = require('node:fs');
const path = require('node:path');

require('dotenv').config()

const token = process.env.TOKEN
const applicationID = process.env.ID

const { REST, Routes, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, ModalBuilder } = require('discord.js');

const rest = new REST().setToken(token);

const client = new Discord.Client({ intents: [
  Discord.GatewayIntentBits.Guilds, 
  Discord.GatewayIntentBits.GuildMessages,
  Discord.GatewayIntentBits.DirectMessages,
] });

const commands = [];
const buttons = [];
const modals = [];
(() => { // COMMANDS
  // Adding commands to the Discord Commands Collection

  client.commands = new Discord.Collection()

  const commandsPath = path.join(__dirname, 'commands'); // /commands
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // all files in /commands with .js

  for (const file of commandFiles) {
    let filePath = path.join(commandsPath, file); // /commands/cmd.js
    let command = require(filePath); // command

    if ('data' in command && 'execute' in command) { // command is valid?
      client.commands.set(command.data.name, command); // add command to collection
      commands.push(command.data.toJSON())
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }

  // Deploying commands:

  (async () => {
    try {
      const data = await rest.put(
        Routes.applicationCommands(applicationID),
        { body: commands },
      );
    } catch (error) {
      console.error(error);
    }
  })();
})();

(() => { // BUTTONS INTERACTIONS
  // Adding buttons interactions to the buttons array

  const buttonsPath = path.join(__dirname, 'interactions/buttons'); // /buttons
  const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js')); // all files in /buttons with .js

  for (const file of buttonFiles) {
    let filePath = path.join(buttonsPath, file); // /buttons/file.js
    let button = require(filePath); // button

    if ('data' in button && 'execute' in button) { // button is valid?
      buttons.push(button); // add button to collection
    } else {
      console.log(`[WARNING] The button at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
})();

(() => { // MODALS INTERACTIONS
  // Adding modals interactions to the modals array

  const modalsPath = path.join(__dirname, 'interactions/modals'); // /modals
  const buttonFiles = fs.readdirSync(modalsPath).filter(file => file.endsWith('.js')); // all files in /modals with .js

  for (const file of buttonFiles) {
    let filePath = path.join(modalsPath, file); // /modals/file.js
    let button = require(filePath); // button

    if ('data' in button && 'execute' in button) { // button is valid?
      modals.push(button); // add button to collection
    } else {
      console.log(`[WARNING] The button at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
})();



// STARTING BOT ----- ----- ----- -----
console.log('... loading ...'.green)

client.on('ready', () => {
  // console.clear()
  console.log(`Started bot as ${client.user.username}!`.green.bold);
  console.log(('Bot has ' + commands.length + ' commands!').toString().blue)
  console.log(('Bot has ' + buttons.length + ' buttons interactions!').toString().blue)
  console.log(('Bot has ' + modals.length + ' modals interactions!').toString().blue)
  console.log('')
  console.log('I\'m in ' + Array.from(client.guilds.cache).length.toString().yellow + ' servers.')
});
// ----- ----- ----- ----- ----- ----- ----- -----



let cancel = new ButtonBuilder() // A simple cancel button
  .setCustomId('cancel')
  .setLabel('Cancel')
  .setStyle(ButtonStyle.Secondary);



client.on('interactionCreate', async interaction => { // ALL INTERACTIONS

  if(interaction.isButton()) {
    
    let button = buttons.find(btn => btn.data.id === interaction.customId)

    try {
      await button.execute(interaction);
    } catch (error) {
      console.error(error);
    }

  } else if(interaction.isChatInputCommand()) {
    
    let command = interaction.client.commands.get(interaction.commandName);
    console.log('Someone executed ' + command.data.name + ' command!')

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
    }

  } else if(interaction.isModalSubmit()) {

    console.log(modals)
    console.log(interaction.customId)
    let modal = modals.find(mdl => mdl.data.id === interaction.customId)

    try {
      await modal.execute(interaction);
    } catch (error) {
      console.error(error);
    }

  }

});

client.login(token);