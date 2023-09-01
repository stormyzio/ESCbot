const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Reply pong!'),
	async execute(interaction) {
		await interaction.reply('**Not** just a pong command. A **super pong** command!');
	},
};