require('dotenv').config()
const { REST, Routes, ApplicationCommandOptionType} = require('discord.js')

const commands = [
    {
        name : "r",
        description: "roll a dice",
        options: [
            {
                name: "number",
                description: "number of dices",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: "max",
                description: "max value of the dices",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: "modifier",
                description: "modifier of the roll",
                type: ApplicationCommandOptionType.Number,
                required: true,
            }
        ]
    },
    {
        name : "help",
        description: "List of all the commands",
    }
]

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try{
        console.log('Registering slash commands...')

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands}
        )

        console.log('Slash commands were registered successfully')
    } 
    catch (error){
        console.log(`error ${error}`)
    }
})()