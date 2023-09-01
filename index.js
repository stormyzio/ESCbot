try {
  const Discord = require('discord.js');
} catch {
  console.log('You need to install depedencies with: npm install')
  return;
}

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


// Adding commands to the Discord Commands Collection

const commands = [];
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



// Starting bot -----
console.log('... loading ...'.green)

client.on('ready', () => {
  console.clear()
  console.log(`Started bot as ${client.user.username}!`.green.bold);
  console.log(('Bot has ' + commands.length + ' commands!').toString().blue)
  console.log('')
  console.log('I\'m in ' + Array.from(client.guilds.cache).length.toString().yellow + ' servers.')
});


let cancel = new ButtonBuilder() // A simple cancel button
  .setCustomId('cancel')
  .setLabel('Cancel')
  .setStyle(ButtonStyle.Secondary);


const btnidInteraction = require('./interactions/buttons/btnid.js')

client.on('interactionCreate', async interaction => {
  if(interaction.isButton()) {
    
    if(interaction.customId === 'btnid') { // This is an exemple button interaction
      btnidInteraction(interaction)
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

    // Modals interactions

  }

});

client.login(token);