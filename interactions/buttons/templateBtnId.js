const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js')

module.exports = {
  data: {
    name: 'template Btn Interaction',
    description: 'The button template',
    id: 'templateBtnId'
  },
  async execute(interaction) {

    let modal = new ModalBuilder()
			.setCustomId('templateModalId')
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