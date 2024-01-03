module.exports = (message, player) => {
    const messageWords = message.content.split(' ')
    
    var erg = Math.floor(Math.random() * 20) + 1
    if(messageWords[1] == "init"){
        message.reply(`${erg} + ${player.init} = ${erg + player.init}`)
    }
    if(messageWords[1] == "stre"){
        message.reply(`${erg} + ${player.str} = ${erg + player.str}`)
    }
    if(messageWords[1] == "stresv"){
        message.reply(`${erg} + ${player.strsv} = ${erg + player.strsv}`)
    }
    if(messageWords[1] == "dext"){
        message.reply(`${erg} + ${player.dex} = ${erg + player.dex}`)
    }
    if(messageWords[1] == "dextsv"){
        message.reply(`${erg} + ${player.dexsv} = ${erg + player.dexsv}`)
    }
    if(messageWords[1] == "cons"){
        message.reply(`${erg} + ${player.con} = ${erg + player.con}`)
    }
    if(messageWords[1] == "conssv"){
        message.reply(`${erg} + ${player.consv} = ${erg + player.consv}`)
    }
    if(messageWords[1] == "inte"){
        message.reply(`${erg} + ${player.int} = ${erg + player.int}`)
    }
    if(messageWords[1] == "intesv"){
        message.reply(`${erg} + ${player.intsv} = ${erg + player.intsv}`)
    }
    if(messageWords[1] == "wisd"){
        message.reply(`${erg} + ${player.wis} = ${erg + player.wis}`)
    }
    if(messageWords[1] == "wisdsv"){
        message.reply(`${erg} + ${player.wissv} = ${erg + player.wissv}`)
    }
    if(messageWords[1] == "char"){
        message.reply(`${erg} + ${player.char} = ${erg + player.char}`)
    }
    if(messageWords[1] == "charsv"){
        message.reply(`${erg} + ${player.charsv} = ${erg + player.charsv}`)
    }
    if(messageWords[1] == "athl"){
        message.reply(`${erg} + ${player.ath} = ${erg + player.ath}`)
    }
    if(messageWords[1] == "acro"){
        message.reply(`${erg} + ${player.acr} = ${erg + player.acr}`)
    }
    if(messageWords[1] == "slei"){
        message.reply(`${erg} + ${player.sleigt} = ${erg + player.sleight}`)
    }
    if(messageWords[1] == "stea"){
        message.reply(`${erg} + ${player.stealth} = ${erg + player.stealth}`)
    }
    if(messageWords[1] == "arca"){
        message.reply(`${erg} + ${player.arc} = ${erg + player.arc}`)
    }
    if(messageWords[1] == "hist"){
        message.reply(`${erg} + ${player.his} = ${erg + player.his}`)
    }
    if(messageWords[1] == "inve"){
        message.reply(`${erg} + ${player.inves} = ${erg + player.inves}`)
    }
    if(messageWords[1] == "natu"){
        message.reply(`${erg} + ${player.nat} = ${erg + player.nat}`)
    }
    if(messageWords[1] == "reli"){
        message.reply(`${erg} + ${player.religion} = ${erg + player.religion}`)
    }
    if(messageWords[1] == "anim"){
        message.reply(`${erg} + ${player.ani} = ${erg + player.ani}`)
    }
    if(messageWords[1] == "insi"){
        message.reply(`${erg} + ${player.insight} = ${erg + player.insight}`)
    }
    if(messageWords[1] == "medi"){
        message.reply(`${erg} + ${player.med} = ${erg + player.med}`)
    }
    if(messageWords[1] == "perc"){
        message.reply(`${erg} + ${player.perc} = ${erg + player.perc}`)
    }
    if(messageWords[1] == "surv"){
        message.reply(`${erg} + ${player.sur} = ${erg + player.sur}`)
    }
    if(messageWords[1] == "dece"){
        message.reply(`${erg} + ${player.dec} = ${erg + player.dec}`)
    }
    if(messageWords[1] == "inti"){
        message.reply(`${erg} + ${player.inti} = ${erg + player.inti}`)
    }
    if(messageWords[1] == "perf"){
        message.reply(`${erg} + ${player.perf} = ${erg + player.perf}`)
    }
    if(messageWords[1] == "pers"){
        message.reply(`${erg} + ${player.pers} = ${erg + player.pers}`)
    }
}

