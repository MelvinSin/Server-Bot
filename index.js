const { GatewayIntentBits, MessageActivityType, EmbedBuilder } = require("discord.js")
const Discord = require("discord.js")
const addModifier = require("./function/addModifier")
require("dotenv").config()


const Player = require('./player/player.js')
const attrRoll = require('./function/attrRoll')
const roll = require('./function/roll')
const singleRoll = require('./function/singleRoll')
const advantageRoll = require("./function/advantageRoll.js")
const disadvantageRoll = require("./function/disadvantageRoll.js")

const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
})

var xan = new Player(3, 0, 0, 3, 3, 2, 2, 0, 0, 5, 8, 0, 3, 0, 3, 3, 3, 3, 0, 3, 0, 0, 5, 8, 8, 8, 8, 0, 0, 0, 0)
var arestop = new Player(2, 4, 4, 2, 2, 3, 3, 0, 0, -1, 2, 1, 4, 7, 2, 2, 2, 0, 0, 0, 0, 3, -1, -1, 2, -1, -1, 1, 4, 1, 1)
var eslan = new Player(0, -1, -1, 0, 0, -1, -1, 3, 3, 2, 5, 5, 8, 0, 1, 1, 1, 7, 4, 4, 4, 4, 3, 6, 3, 3, 3, 9, 6, 6, 9)
var xuaq = new Player(3, 5, 8, 3, 3, 4, 7, -1, -1, -1, -1, -1, -1, 8, 6, 3, 3, -1, -1, -1, 2, -1, 2, -1, -1, 2, -1, -1, 8, 2, -1)
var faenn = new Player(5,-1,2,5,5,4,7,-1,-1,3,6,-1,-1,2,8,5,5,-1,-1,-1,-1,-1,3,3,3,6,6,-1,-1,-1,5)

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`)
})

//Playerroll
client.on("messageCreate", (message) => {
  const messageWords = message.content.split(' ')

  if (messageWords[0] == "-t") {
    if (message.author.id == "513821779429687296") {
      attrRoll(message, xan)
    }
    if (message.author.id == "300687482465288194") {
      attrRoll(message, eslan)
    }
    if (message.author.id == "447339564223299585") {
      attrRoll(message, arestop)
    }
    if (message.author.id == "395938979293167617") {
      attrRoll(message, xuaq)
    }
    if (message.author.id == "517329828727488554") {
      attrRoll(message, faenn)
    }
  }

  if (messageWords[0] == "-ad") {
    if (message.author.id == "513821779429687296") {
      advantageRoll(message, xan)
    }
    if (message.author.id == "300687482465288194") {
      advantageRoll(message, eslan)
    }
    if (message.author.id == "447339564223299585") {
      advantageRoll(message, arestop)
    }
    if (message.author.id == "395938979293167617") {
      advantageRoll(message, xuaq)
    }
    if (message.author.id == "517329828727488554") {
      advantageRoll(message, faenn)
    }
  }
  
  if (messageWords[0] == "-di") {
    if (message.author.id == "513821779429687296") {
      disadvantageRoll(message, xan)
    }
    if (message.author.id == "300687482465288194") {
      disadvantageRoll(message, eslan)
    }
    if (message.author.id == "447339564223299585") {
      disadvantageRoll(message, arestop)
    }
    if (message.author.id == "395938979293167617") {
      disadvantageRoll(message, xuaq)
    }
    if (message.author.id == "517329828727488554") {
      disadvantageRoll(message, faenn)
    }
  }
})


//interaction on commands
client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName == "r") {
    const num1 = interaction.options.get("number").value
    const num2 = interaction.options.get("max").value
    const num3 = interaction.options.get("modifier").value
    var erg = 0
    var random = 0
    var string = ""

    for (let i = 0; i < num1; i++) {
      random = Math.floor(Math.random() * (num2 - 1)) + 1
      erg += random
      if (i == 0) {
        string += random
      }
      else {
        string += " + " + random
      }
    }

    string += " + " + num3
    erg += num3
    interaction.reply(`${string} = ${erg}`)
  }
})





//Roll
client.on('messageCreate', (message) => {
  const messageWords = message.content.split(' ')
  //existiert ein modifier?
  //ist der modifier positiv?s
  var pos
  var modifier = 0
  if (messageWords.length > 1) {
    if (messageWords[1].includes('+')) {
      const messageModifier = messageWords[1].split('+')
      modifier = parseInt(messageModifier[1])
      pos = true

    }
    else if (messageWords[1].includes('-')) {
      const messageModifier = messageWords[1].split('-')
      modifier = messageModifier[1]
      pos = false
    }
  }



  const rollFlavor = messageWords.slice(2).join(' ')



  //Roll with one kind of the dice
  if (messageWords[0] === '-r') {
    roll(message)
  }

  //Roll with multiple dices
  if (messageWords[0] == "-rm") {
    const rolls = messageWords[1].split('+')
    var rollResults = []
    for (let i = 0; i < rolls.length; i++) {
      if (rolls[i].includes('d')) {
        var erg = singleRoll(rolls[i])
        for (let o = 0; o < erg.length; o++) {
          rollResults.push(erg[o])
        }
      }
      else {
        var erg = parseInt(rolls[i])
        rollResults.push(erg)
      }
    }
  

    var sum = rollResults.reduce((a, b) => a + b);
    message.reply(`[${rollResults.toString()}] = ${sum}`)
  }

   //Roll with advantage
   if(messageWords[0] == "-rh"){
    const rollResults = [];
    let erg = 0
    rollResults.push(Math.floor(Math.random()*20)+1)
    rollResults.push(Math.floor(Math.random()*20)+1)

    if(rollResults[0] < rollResults[1]){
        erg = rollResults[1]
    }
    else{
        erg = rollResults[0]
    }

    const ans = addModifier(modifier, pos, erg, rollResults)

    return message.reply(ans)
}

//Roll with disadvantage
if(messageWords[0] == "-rl"){
    const rollResults = [];
    let erg = 0
    rollResults.push(Math.floor(Math.random()*20)+1)
    rollResults.push(Math.floor(Math.random()*20)+1)

    if(rollResults[0] < rollResults[1]){
        erg = rollResults[0]
    }
    else{
        erg = rollResults[1]
    }

    const ans = addModifier(modifier, pos, erg, rollResults)
    console.log(message)
    return message.reply(ans)
}

//Death saving throw
if(messageWords[0] == "-d"){
    const erg = Math.floor(Math.random()*20)+1

    if(erg < 10){
        return message.reply(`${erg} Ready to die?`)
    }
    else{
        return message.reply(`${erg} One step closer to life`)
    }
}
})

client.login(process.env.TOKEN)