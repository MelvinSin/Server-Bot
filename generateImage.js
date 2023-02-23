const Canvas = require("canvas")
const Discord = require("discord.js")
const { DiscordAPIError } = require("discord.js")

//Image link
const background = "https://i.imgur.com/7TIVMp6.jpg"

const  dim = {
    height: 675,
    width: 1200,
    margin: 50
}

const av = {
    size: 256,
    x: 480,
    y: 170
}

const generateImage = async (member) => {
    //getting Information
    let username = member.user.username
    let discrim = member.user.discriminator
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: av.size})

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")
    
    //draw Image
    const backing = await Canvas.loadImage(background)
    ctx.drawImage(backing, 0, 0)

    //readability by creating black tinted box
    ctx.fillStyle = "rgba(0,0,0,0.8)"
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin)

    //load avatar image
    const avimg = await Canvas.loadImage(avatarURL)
    ctx.save()

    //creating circle for the avatar
    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    return attachment
}

module.exports = generateImage