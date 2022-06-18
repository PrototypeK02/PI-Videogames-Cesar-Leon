const axios = require("axios")
require('dotenv').config();
const {YOUR_API_KEY} = process.env
const formatObjectHome = require("../utils/formatObject")



async function getAllNames(req,res,next) {
   
    let {name} = req.query
    if(!name || name === "") {
        throw Error("Field can not be empty")
        
    }
        try {
            let games = (await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&search=${name}`)).data.results
            if(games.length === 0) {
             throw new Error("Videogame not found")
            }

            let top15 = games.map(el => {
                return formatObjectHome.formatObjectHome(el)
            
            })
            
            top15 = top15.slice(0,15)
            console.log(top15.length)
            res.json(top15)
    
        } catch (error) {
            next(error)
        }
    }
 
    
    
    module.exports= {
        getAllNames,
    }