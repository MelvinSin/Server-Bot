/*const express = require("express")
const app = express()

app.listen(3000, () => {
  console.log("Project is running")
})

app.get("/", (req,res) => {
  res.send("Hello World")
})*/

const { GatewayIntentBits, MessageActivityType, EmbedBuilder } = require("discord.js")
const Discord = require("discord.js")
const addModifier = require("./function/addModifier")
require("dotenv").config()

const roll = require('./function/roll')
const singleRoll = require('./function/singleRoll')

const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
})

client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("message", (message) => {
    //if author is a bot, ignore
    if(message.author.bot){
        return;
    }
    if(message.content == "hi"){
        console.log(message)
        message.reply("Schnauze")
    }
})

const welcomeChannelId = "782702704815767573"

//generate image is async, so we need an async func
client.on("guildMemberAdd", (member) => {
    if(member.id == "300687482465288194"){
        id = "300687482465288194"
        member.guild.channels.cache.get(welcomeChannelId).send(`Ach <@${id}> Daniel, wie war der Trip in deinem Keller`)
    }
    if(member.id == "447339564223299585"){
        member.guild.channels.cache.get(welcomeChannelId).send(`Da biste ja wieder`)
    }
})

//interaction on commands
client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName == "r"){
        const num1 = interaction.options.get("number").value
        const num2 = interaction.options.get("max").value
        const num3 = interaction.options.get("modifier").value
        var erg = 0
        var random = 0
        var string = ""

        for(let i = 0; i < num1; i++){
            random = Math.floor(Math.random() * (num2 - 1)) +1
            erg += random
            if(i == 0){
                string += random
            }
            else{
                string += " + " + random
            }
        }

        string += " + " + num3
        erg += num3
        interaction.reply(`${string} = ${erg}`)
    }
})



client.on("messageCreate", (message) => {
    if(message.content == "t"){
        message.reply(`hör auf zu laggen!!`)
    }
    if(message.content.includes("digga")){
        message.reply(`Ching Chang Chong`)
    }
    if(message.content == "gumo"){
        id = "300687482465288194"
        message.reply(`Gumo <@${id}> :)`)
    }
  if(message.content == "d"){
        message.reply(`DEEEEZ Nuts!!`)
    }
})

client.on('messageCreate', (message) => {
    const messageWords = message.content.split(' ')
    //existiert ein modifier?
    //ist der modifier positiv?s
    var pos
    var modifier = 0
    if(messageWords.length > 1){
        if(messageWords[1].includes('+')){
            const messageModifier = messageWords[1].split('+')
            modifier = parseInt(messageModifier[1])
            pos = true
            
        }
        else if(messageWords[1].includes('-')){
            const messageModifier = messageWords[1].split('-')
            modifier = messageModifier[1]
            pos = false
        }
    }
    	
    

    const rollFlavor = messageWords.slice(2).join(' ')
    //Help menu
    if(messageWords[0] == "-help"){
        const embed = new EmbedBuilder()
        .setTitle("Help")
        .setDescription('List of all the commands')
        .setColor('DarkBlue')
        .addFields({name: ` `, value: ` `})
        .addFields({name: 'rules', value: 'everything after the commands need to be written together'},
        {name: 'example', value: '-rm 1d20+3d12+5'},
        {name: '[optional]', value: 'with a modifier'},
        {name:  ` `, value: ` ` },
        {name: ` ` , value: ` ` },
        {name: ` ` , value: ` ` },
        {name: '-r', value: 'roll a d20'}, 
        {name: '-r xdy+z', value: 'roll x dices with y sides and add z to it'},
        {name: '-rh', value: 'roll 2d20 with advantage [optional]' }, 
        {name: '-rl', value: 'roll 2d20 with disadvantage [optional]'},
        {name: '-rm', value: 'roll multiple dices [optional]'},
        {name: '-d', value: 'death saving throw'},
        {name: '-dm', value: 'Special dice for the DM'})
        message.reply({ embeds: [embed]})
    }
    

    //Roll with one kind of the dice
    if (messageWords[0] === '-r') {
        roll(message)
    }

    //Roll with multiple dices
    if(messageWords[0] == "-rm"){
        const rolls = messageWords[1].split('+')
        var rollResults = []
        for(let i = 0; i < rolls.length; i++){
          if(rolls[i].includes('d')){
            var erg = singleRoll(rolls[i])
            for(let o = 0; o < erg.length; o++){
                rollResults.push(erg[o])
            }
          }
          else{
            var erg = parseInt(rolls[i])
            rollResults.push(erg)
          }
        }

        var sum = rollResults.reduce((a,b) => a + b);
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

    if(messageWords[0] == "-dm"){
        if(message.author.id == "383707465411198976"){
            const erg = Math.floor(Math.random()*20)+1
            if(erg == 1){
                return message.reply("1: Welp, Lets kill the cat")
            }
            else if(erg == 20){
                return message.reply("20: God mode on!! Time to kill the players")
            }
            else{
                return message.reply("Roll better or worse ;D")
            }
        } 
    }

    if(messageWords[0] == "-camo"){
        //sends pm to the id
        client.users.fetch("513821779429687296").then (dm =>{
            dm.send("here")
        })
        //sends pm to the author
        client.users.get("513821779429687296").send("Here")
    }
  })

client.login(process.env.TOKEN)