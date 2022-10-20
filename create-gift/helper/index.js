 const getGiftByuser = ()=> {
    const getSeason = d => Math.floor((d.getMonth() / 12 * 4)) % 4
    const season = ['Summer', 'Autumn', 'Winter', 'Spring'][getSeason(new Date())];

    let gift = '';
    switch (season) {
        case "Summer":
            gift = "remera"
            break;
        case "Autumn":
            gift = "buzo"
            break;
        case "Winter":
            gift = "sweater"
            break;
        case "Spring":
            gift = "camisa"
            break;
    }
    return gift;
}


module.exports = { getGiftByuser  }