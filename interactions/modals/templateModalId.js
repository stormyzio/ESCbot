module.exports = {
  data: {
    name: 'template Modal Interaction',
    description: 'The modal template',
    id: 'templateModalId'
  },
  async execute(interaction) {
    await interaction.reply('**This is a template modal!**')
  }
}