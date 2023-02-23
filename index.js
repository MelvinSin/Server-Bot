const { GatewayIntentBits } = require("discord.js")
const Discord = require("discord.js")
require("dotenv").config()


const TOKEN = "MTA3ODMwNTI5NDkwOTcxMDQzNg.GvG-1R.vNf92BodOxyWLS79whhqReGTKRehvIbYqgjDTY"

const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
    if(message.content == "hi"){
        message.reply("Hello World!")
    }
})

client.login(process.env.TOKEN)