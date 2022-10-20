function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const getCardByuser = (birthday)=> {
    const YEAR = 1000 * 60 * 60 * 24 * 365;
    const dateInit = new Date(birthday).getTime();
    const dateNow = new Date().getTime();
    return {
        cardNumber: Math.floor(Math.random() * 1000000000000000),
        expireDate: new Date(randomDate(new Date(2022, 4, 1), new Date())).toISOString(),
        cvv: Math.floor(Math.random() * 1000),
        cardType: (dateNow - dateInit) < 45 * YEAR ? "CLASSIC" : "GOLD",
    }
}


module.exports = { getCardByuser  }