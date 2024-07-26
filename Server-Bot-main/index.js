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


const Player = require('./player/player.js')
const attrRoll = require('./function/attrRoll')
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

var xan = new Player(3,0,0,3,3,2,2,0,0,4,7,0,3,0,3,3,3,3,0,3,0,0,4,7,7,7,7,0,0,0,0)
var arestop = new Player(2,4,4,2,2,3,3,0,0,-1,2,1,4,7,2,2,2,0,0,0,0,3,-1,-1,2,-1,-1,1,4,1,1)
var eslan = new Player(0,-1,-1,0,0,-1,-1,3,3,2,5,4,7,0,1,1,1,7,4,4,4,4,3,6,3,3,3,8,5,5,5 )
var xuaq = new Player(3,4,7,3,3,2,5,-1,-1,-1,-1,-1,-1,7,6,3,3,-1,-1,-1,-1,-1,2,-1,-1,-1,-1,-1,7,2,-1)


client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}`)
})

//Playerroll
client.on("messageCreate", (message) => {
    const messageWords = message.content.split(' ')

    if(messageWords[0] == "-t"){
        if(message.author.id == "513821779429687296"){
            attrRoll(message,xan)
        }
        if(message.author.id == "300687482465288194"){
            attrRoll(message,eslan)
        }
        if(message.author.id == "447339564223299585"){
            attrRoll(message,arestop)
        }
        if(message.author.id == "395938979293167617"){
            attrRoll(message,xuaq)
        }
    }
})







client.on("message", (message) => {
    //if author is a bot, ignore
    if(message.author.bot){
        return;
    }
    if(message.content == "hi"){
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

//Roll
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
        {name: '-dm', value: 'Special dice for the DM'},
        {name: ` ` , value: ` ` },
        {name: `help2 and help3 only for Xan, Eslan, Arestop, Xuaq` , value: ` ` },
        {name: ` ` , value: ` ` },
        {name: `-help2` , value: `second help page` },
        {name: `-help3` , value: `third help page` },)

        message.reply({ embeds: [embed]})
    }
    
    if(messageWords[0] == "-help2"){
        const embed2 = new EmbedBuilder()
        .setTitle("Help 2")
        .setDescription('List of all the commands (page 2)')
        .setColor('Aqua')
        .addFields({name: ` `, value: ` `})
        .addFields({name: 'rules', value: '-t + attribute'},
        {name: ` `, value: ` `},
        {name: ` `, value: ` `},
        {name: 'init', value: 'Initiative'},
        {name: 'str', value: 'Strength'},
        {name: 'strsv', value: 'Strength saving throw'},
        {name: 'dex', value: 'Dexterity'},
        {name: 'dexsv', value: 'Dexterity saving throw'},
        {name: 'con', value: 'Constitution'},
        {name: 'consv', value: 'Constitution saving throw'},
        {name: 'int', value: 'Intelligent'},
        {name: 'intsv', value: 'Intelligent saving throw'},
        {name: 'wis', value: 'Wisdom'},
        {name: 'wissv', value: 'Wisdom saving throw'},
        {name: 'char', value: 'Charisma'},
        {name: 'charsv', value: 'Charisma saving throw'},
       )

        message.reply({ embeds: [embed2]})
    }
    if(messageWords[0] == "-help3"){
        const embed2 = new EmbedBuilder()
        .setTitle("Help 3")
        .setDescription('List of all the commands (page 3)')
        .setColor('Aqua')
        .addFields({name: ` `, value: ` `})
        .addFields({name: 'rules', value: '-t + attribute'},
        {name: ` `, value: ` `},
        {name: ` `, value: ` `},
        {name: 'ath', value: 'Athletic'},
        {name: 'acr', value: 'Acrobatic'},
        {name: 'sleight', value: 'Sleight of Hands'},
        {name: 'arc', value: 'Arcana'},
        {name: 'his', value: 'History'},
        {name: 'inves', value: 'Investigation'},
        {name: 'nat', value: 'Nature'},
        {name: 'religion', value: 'Religion'},
        {name: 'ani', value: 'Animal Handling'},
        {name: 'ins', value: 'Insight'},
        {name: 'med', value: 'Medicine'},
        {name: 'perc', value: 'Perception'},
        {name: 'sur', value: 'Survival'},
        {name: 'dec', value: 'Deception'},
        {name: 'inti', value: 'Intimidation'},
        {name: 'perf', value: 'Performance'},
        {name: 'pers', value: 'Persuasion'},
       )
        message.reply({ embeds: [embed2]})
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