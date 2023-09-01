const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pingo')
		.setDescription('Reply pong!'),

	async execute(interaction) {

		let btn1 = new ButtonBuilder()
			.setCustomId('templateBtnId')
			.setLabel('Template Button')
			.setStyle(ButtonStyle.Primary);

		let row = new ActionRowBuilder()
			.addComponents(btn1);

		await interaction.reply({
			content: '**Not** just a pong command. A **super pong** command!',
			components: [row]
		});
		
	},
};