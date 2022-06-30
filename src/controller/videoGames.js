const axios = require("axios")
require('dotenv').config();
const {YOUR_API_KEY} = process.env
const formatObjectHome = require("../utils/formatObject")
const { Videogame, Genre } = require("../db")
const { getAllNames} = require("./videoGameName")



async function getAllGames(req,res,next) {

    const {name} = req.query
    if(name && name !== "") {
        try {
        let allNames = await getAllNames(name)
        res.send(allNames)
        }catch(error) {
            res.status(404).send(error.message)
        }
    }

else{
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
        next(error.message)
    }
}

let videogamesDB = await Videogame.findAll({
    include: {
        model: Genre,
}})
console.log(videogamesDB)
if(videogamesDB.length > 0) {
    videogamesDB.reverse()

    final = videogamesDB.concat(final)
}



res.json(final)
}
}

module.exports= {
    getAllGames,
}