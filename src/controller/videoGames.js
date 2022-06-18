const axios = require("axios")
require('dotenv').config();
const {YOUR_API_KEY} = process.env
const formatObjectHome = require("../utils/formatObject")

async function getAllGames(req,res,next) {
let pages = 1
let final = []
    for(let i =0; i<5; i++) {
    try {
        let games = (await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=${pages}`)).data.results
        let top100 = games.map(el => {
            return formatObjectHome.formatObjectHome(el)
        
        })
        final = final.concat(top100)
       
        pages++

    } catch (error) {
        next(error)
    }
}
console.log(final.length)
res.json(final)
}

module.exports= {
    getAllGames,
}