module.exports = (message, player) => {
    const messageWords = message.content.split(' ')
    
    var erg = Math.floor(Math.random() * 20) + 1
    var erg2 = Math.floor(Math.random() * 20) + 1
    if(messageWords[1] == "init"){
        message.reply(`[${erg}, ${erg2}] + ${player.init} = ${Math.min(erg,erg2) + player.init}`)
    }
    if(messageWords[1] == "stre"){
        message.reply(`[${erg}, ${erg2}] + ${player.str} = ${Math.min(erg,erg2) + player.str}`)
    }
    if(messageWords[1] == "stresv"){
        message.reply(`[${erg}, ${erg2}] + ${player.strsv} = ${Math.min(erg,erg2) + player.strsv}`)
    }
    if(messageWords[1] == "dext"){
        message.reply(`[${erg}, ${erg2}] + ${player.dex} = ${Math.min(erg,erg2) + player.dex}`)
    }
    if(messageWords[1] == "dextsv"){
        message.reply(`[${erg}, ${erg2}] + ${player.dexsv} = ${Math.min(erg,erg2) + player.dexsv}`)
    }
    if(messageWords[1] == "cons"){
        message.reply(`[${erg}, ${erg2}] + ${player.con} = ${Math.min(erg,erg2) + player.con}`)
    }
    if(messageWords[1] == "conssv"){
        message.reply(`[${erg}, ${erg2}] + ${player.consv} = ${Math.min(erg,erg2) + player.consv}`)
    }
    if(messageWords[1] == "inte"){
        message.reply(`[${erg}, ${erg2}] + ${player.int} = ${Math.min(erg,erg2) + player.int}`)
    }
    if(messageWords[1] == "intesv"){
        message.reply(`[${erg}, ${erg2}] + ${player.intsv} = ${Math.min(erg,erg2) + player.intsv}`)
    }
    if(messageWords[1] == "wisd"){
        message.reply(`[${erg}, ${erg2}] + ${player.wis} = ${Math.min(erg,erg2) + player.wis}`)
    }
    if(messageWords[1] == "wisdsv"){
        message.reply(`[${erg}, ${erg2}] + ${player.wissv} = ${Math.min(erg,erg2) + player.wissv}`)
    }
    if(messageWords[1] == "char"){
        message.reply(`[${erg}, ${erg2}] + ${player.char} = ${Math.min(erg,erg2) + player.char}`)
    }
    if(messageWords[1] == "charsv"){
        message.reply(`[${erg}, ${erg2}] + ${player.charsv} = ${Math.min(erg,erg2) + player.charsv}`)
    }
    if(messageWords[1] == "athl"){
        message.reply(`[${erg}, ${erg2}] + ${player.ath} = ${Math.min(erg,erg2) + player.ath}`)
    }
    if(messageWords[1] == "acro"){
        message.reply(`[${erg}, ${erg2}] + ${player.acr} = ${Math.min(erg,erg2) + player.acr}`)
    }
    if(messageWords[1] == "slei"){
        message.reply(`[${erg}, ${erg2}] + ${player.sleigt} = ${Math.min(erg,erg2) + player.sleight}`)
    }
    if(messageWords[1] == "stea"){
        message.reply(`[${erg}, ${erg2}] + ${player.stealth} = ${Math.min(erg,erg2) + player.stealth}`)
    }
    if(messageWords[1] == "arca"){
        message.reply(`[${erg}, ${erg2}] + ${player.arc} = ${Math.min(erg,erg2) + player.arc}`)
    }
    if(messageWords[1] == "hist"){
        message.reply(`[${erg}, ${erg2}] + ${player.his} = ${Math.min(erg,erg2) + player.his}`)
    }
    if(messageWords[1] == "inve"){
        message.reply(`[${erg}, ${erg2}] + ${player.inves} = ${Math.min(erg,erg2) + player.inves}`)
    }
    if(messageWords[1] == "natu"){
        message.reply(`[${erg}, ${erg2}] + ${player.nat} = ${Math.min(erg,erg2) + player.nat}`)
    }
    if(messageWords[1] == "reli"){
        message.reply(`[${erg}, ${erg2}] + ${player.religion} = ${Math.min(erg,erg2) + player.religion}`)
    }
    if(messageWords[1] == "anim"){
        message.reply(`[${erg}, ${erg2}] + ${player.ani} = ${Math.min(erg,erg2) + player.ani}`)
    }
    if(messageWords[1] == "insi"){
        message.reply(`[${erg}, ${erg2}] + ${player.insight} = ${Math.min(erg,erg2) + player.insight}`)
    }
    if(messageWords[1] == "medi"){
        message.reply(`[${erg}, ${erg2}] + ${player.med} = ${Math.min(erg,erg2) + player.med}`)
    }
    if(messageWords[1] == "perc"){
        message.reply(`[${erg}, ${erg2}] + ${player.perc} = ${Math.min(erg,erg2) + player.perc}`)
    }
    if(messageWords[1] == "surv"){
        message.reply(`[${erg}, ${erg2}] + ${player.sur} = ${Math.min(erg,erg2) + player.sur}`)
    }
    if(messageWords[1] == "dece"){
        message.reply(`[${erg}, ${erg2}] + ${player.dec} = ${Math.min(erg,erg2) + player.dec}`)
    }
    if(messageWords[1] == "inti"){
        message.reply(`[${erg}, ${erg2}] + ${player.inti} = ${Math.min(erg,erg2) + player.inti}`)
    }
    if(messageWords[1] == "perf"){
        message.reply(`[${erg}, ${erg2}] + ${player.perf} = ${Math.min(erg,erg2) + player.perf}`)
    }
    if(messageWords[1] == "pers"){
        message.reply(`[${erg}, ${erg2}] + ${player.pers} = ${Math.min(erg,erg2) + player.pers}`)
    }
}

