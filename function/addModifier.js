
module.exports = (modifier, pos, sum, rollResults) => {
    if(modifier != 0){
        if(pos){
            sum += modifier
            const erg = `[${rollResults.toString()}] + ${modifier} = ${sum}`
            return erg
        }
        else{
            sum -= modifier
            const erg =`[${rollResults.toString()}] - ${modifier} = ${sum}`
            return erg
        }
    }
    else{
        const erg = `[${rollResults.toString()}] = ${sum}`
        return erg
    }
}