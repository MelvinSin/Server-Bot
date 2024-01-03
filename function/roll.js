const addModifier = require('../function/addModifier')

module.exports = (message) => {
    const messageWords = message.content.split(' ')
    //existiert ein modifier?
    //ist der modifier positiv?
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

    //Roll with one kind of the dice

    if (messageWords.length === 1) {
        // !roll
        return message.reply(
        '1d20: ' + (Math.floor(Math.random() * 20) + 1) + ' ' + rollFlavor
        )
    }
    
    let sides = messageWords[1]; // !roll 20
    let rolls = 1;
    if (!isNaN(messageWords[1][0] / 1) && messageWords[1].includes('d')) {
        // !roll 4d20
        rolls = messageWords[1].split('d')[0] / 1;
        sides = messageWords[1].split('d')[1]
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
        rollResults.push(Math.floor(Math.random()*sides)+1);
        }
        var sum = rollResults.reduce((a,b) => a + b);

        const ans = addModifier(modifier, pos, sum, rollResults)
  
        message.reply(`${messageWords[1]} : ${ans}`)

    } else {
        let zwerg = Math.floor(Math.random() * sides) +1
        var erg = zwerg
        
        const ans = addModifier(modifier, pos, erg, zwerg)
        
        message.reply(`${messageWords[1]} : ${ans}`)
    } 
    
}