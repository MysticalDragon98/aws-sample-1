module.exports = {
    getfinalPrice : (cardType, price)=> {
        if(cardType === "CLASSIC"){
            return  Number(price) - Number(price) * 0.08 
        }

        if(cardType === "GOLD"){
            return  Number(price) - Number(price) * 0.12
        }
    }
}