const axios = require("axios")
require('dotenv').config();
const {YOUR_API_KEY} = process.env
const formatObjectHome = require("../utils/formatObject")


async function getGameId(req,res,next) {
   
    let {id} = req.params
    
    
        try {
            let games = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`)).data
            if(games.length === 0) {
             throw new Error("Videogame not found")
            }

            let finalgame = formatObjectHome.formatObjectHome(games)
            
            
            
            
            console.log(finalgame)
            res.json(finalgame)
    
        } catch (error) {
            next(error)
        }
    }
 
    
    
    module.exports= {
        getGameId,
    }