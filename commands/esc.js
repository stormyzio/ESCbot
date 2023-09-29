import { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('esc')
		.setDescription('Reply pong!'),

	async execute(interaction) {

		let btn1 = new ButtonBuilder()
			.setCustomId('TemplateButtonHandler')
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