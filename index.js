const { GatewayIntentBits, MessageActivityType } = require("discord.js")
const Discord = require("discord.js")
require("dotenv").config()

const generateImage = require("./generateImage")


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

client.on("messageCreate", (message) => {
    //if author is a bot, ignore
    if(message.author.bot){
        return;
    }

    if(message.content == "hi"){
        message.reply("Schnauze")
    }
})

const welcomeChannelId = "1078336416699916358"

//generate image is async, so we need an async func
client.on("guildMemberAdd", (member) => {
    member.guild.channels.cache.get(welcomeChannelId).send(`<@${member.id}> Welcome to the server!`)
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
        message.reply(`<@${member.id}> hör auf zu laggen!!`)
    }
})

client.on('messageCreate', (message) => {
    const messageWords = message.content.split(' ')
    //existiert ein modifier?
    //ist der modifier positiv?
    var pos
    var modifier = 0
    
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
    	
    

    const rollFlavor = messageWords.slice(2).join(' ')

    //Roll with one kind of the dice
    if (messageWords[0] === '-r') {
      if (messageWords.length === 1) {
        // !roll
        return message.reply(
          (Math.floor(Math.random() * 6) + 1) + ' ' + rollFlavor
        );
      }
      
      let sides = messageWords[1]; // !roll 20
      let rolls = 1;
      if (!isNaN(messageWords[1][0] / 1) && messageWords[1].includes('d')) {
        // !roll 4d20
        rolls = messageWords[1].split('d')[0] / 1;
        sides = messageWords[1].split('d')[1];
        sides = sides.split('+')[0]
      } else if (messageWords[1][0] == 'd') {
        // !roll d20
        sides = sides.slice(1);
      }
      sides = sides / 1; // convert to number
      if (isNaN(sides) || isNaN(rolls)) {
        return;
      }
      if (rolls > 1) {
        const rollResults = [];
        for (let i = 0; i < rolls; i++) {
          rollResults.push(Math.floor(Math.random()*(sides-1))+1);
        }
        var sum = rollResults.reduce((a,b) => a + b);

        if(modifier != 0){
            if(pos){
                sum += modifier
                return message.reply(`[${rollResults.toString()}] + ${modifier} = ${sum}`)
            }
            else{
                sum -= modifier
                return message.reply(`[${rollResults.toString()}] - ${modifier} = ${sum}`)
            }
        }
        else{
            return message.reply(`[${rollResults.toString()}] = ${sum}`)
        }

      } else {
        let zwerg = Math.floor(Math.random() * (sides-1)) +1
        var erg = zwerg

        if(modifier != 0){
            if(pos){
                erg += modifier
                return message.reply(`${zwerg} + ${modifier} = ${erg}` )
            }
            else{
                erg -= modifier
                return message.reply(`${zwerg} + ${modifier} = ${erg}` )
            }
        }
        else{
            return message.reply(`${zwerg}` )
        }
      }
    }

    //Roll with multiple dices
    if(message[0] == "-rm"){
        const rolls = message.content.split('+')

        for(let i = 0; i < rolls.length; i++){
            
        }
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

        if(modifier != 0){
            if(pos){
                erg += modifier
                return message.reply(`[${rollResults.toString()}] + ${modifier} = ${erg}`)
            }
            else{
                erg -= modifier
                return message.reply(`[${rollResults.toString()}] - ${modifier} = ${erg}`)
            }
        }
        else{
            return message.reply(`[${rollResults.toString()}] = ${erg}`)
        }
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

        if(modifier != 0){
            if(pos){
                erg += modifier
                return message.reply(`[${rollResults.toString()}] + ${modifier} = ${erg}`)
            }
            else{
                erg -= modifier
                return message.reply(`[${rollResults.toString()}] - ${modifier} = ${erg}`)
            }
        }
        else{
            return message.reply(`[${rollResults.toString()}] = ${erg}`)
        }
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
  });

client.login(process.env.TOKEN)