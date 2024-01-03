const addModifier = require('../function/addModifier')

module.exports = (message) => {
        
    let sides = message;
    let rolls = 1;
    if (!isNaN(message[0] / 1) && message.includes('d')) {
        // !roll 4d20
        rolls = message.split('d')[0] / 1;
        sides = message.split('d')[1]
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
      
        return rollResults

    } else {
        const rollResults = [];
        rollResults.push(Math.floor(Math.random()*sides)+1);
      
        return rollResults
    } 
}