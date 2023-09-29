import { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js'

export default {
  data: {
    name: 'Template Button handler',
    description: 'This is the button handler template.',
    id: 'TemplateButtonHandler' // This id must be the same as the customId of the button
  },
  async execute(interaction) {

    let modal = new ModalBuilder()
			.setCustomId('TemplateModalHandler')
			.setTitle('Modal Template');

		let favoriteColorInput = new TextInputBuilder()
			.setCustomId('favoriteColorInput')
			.setLabel("What's your favorite color?")
			.setStyle(TextInputStyle.Short);

		let firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);

		modal.addComponents(firstActionRow);

		await interaction.showModal(modal);

  }
}