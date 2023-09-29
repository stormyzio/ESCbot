import Discord from 'discord.js'

export default {
  data: {
    name: 'Template Modal handler',
    description: 'This is the modal handler template.',
    id: 'TemplateModalHandler' // This id must be the same as the customId of the modal
  },
  async execute(interaction) {
    await interaction.reply('**This is a template modal!**')
  }
}