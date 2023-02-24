const { GatewayIntentBits } = require("discord.js")
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
    if(message.content == "roll"){
        const num = Math.floor(Math.random() * 20) + 1
        message.reply(""+num+"")
    }
})

client.login(process.env.TOKEN)