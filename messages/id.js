var { userCodes, leagues } = require('../index')
const Discord = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const colors = require('colors')
const axios = require('axios')

let endID = async message => {
  console.log('id')
  if(typeof userCodes.get(message.author.id) != 'undefined') {
    if(typeof userCodes.get(message.author.id).session != 'undefined') {
      let session = userCodes.get(message.author.id).session

      if(message.content.includes('e/id ')) {
        let res4 = await axios({
          method: 'get',
          url: 'https://exostats.nl/player/' + message.content.split('e/id ')[1].split(' ')[0],
          headers: {
              'Cookie': 'exoses=' + session
          }
        })

        if(JSON.stringify(res4.data).includes('Highest trophy value')) {
          let trophies = JSON.stringify(res4.data.split('Highest trophy value achieved: <div class=container>')[1].split('</div>')[0])
          trophies = trophies.split('"')[1].split('"')[0]
          
          message.channel.send(`${message.author.toString()}, **Ton record de trophées est ${trophies} !**`)
          let member = message.member

          let role;
          let roleName;

          message.channel.send(`Tu vas avoir ton rôle dans un instant...`)

          leagues.forEach((e, i) => {
            member.roles.remove(message.guild.roles.cache.get(e[2]))
            if(i === leagues.length - 1) {
              if(Number(trophies) > e[0]) {
                role = message.guild.roles.cache.get(e[2])
                roleName = e[1]
              }
            } else {
              if(Number(trophies) > e[0] && Number(trophies) < leagues[i + 1][0]) {
                role = message.guild.roles.cache.get(e[2])
                roleName = e[1]
              }
            }
          })

          await member.roles.add(role)
          message.channel.send(`Tu as gagné le role ${roleName} !`)

          userCodes.delete(message.author.id)
            
        } else {
          message.channel.send('**Identifiant incorrecte !**')
        }
      }
    }
  }
}

module.exports = endID