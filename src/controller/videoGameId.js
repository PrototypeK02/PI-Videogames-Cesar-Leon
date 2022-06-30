const axios = require("axios");
require('dotenv').config();
const {YOUR_API_KEY} = process.env
const formatObjectHome = require("../utils/formatObject")
const {Videogame,Genre} = require("../db");


async function getGameId(req,res,next) {
   
    let {id} = req.params

    if(id.length > 10) {
    let videoGameDB = await Videogame.findOne({
      where: {
        id
      },
      include: {
        model: Genre,
      
      },
}
)



let finalgame1 = {
  id: videoGameDB.id,
  name: videoGameDB.name,
  image: videoGameDB.image,
  description: videoGameDB.description,
  rating: videoGameDB.rating,
  releaseDate: videoGameDB.releaseDate,
  plataform: videoGameDB.platform,
  genres: videoGameDB.genres
 
};
console.log(videoGameDB.platform)
res.send(videoGameDB)


}
else {

    
        try {
            let game = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`)).data
            if(game.length === 0) {
             throw new Error("Videogame not found")
            }

            let finalgame = {
                id: game.id,
                name: game.name,
                image: game.background_image,
                description: game.description_raw,
                rating: game.rating,
                releaseDate: game.released,
                plataform: game.parent_platforms.map(el => {
                  return el.platform.name;
                }),
                genres: game.genres.map(el => {
                  return {
                    id: el.id,
                    name: el.name,
                  };
                }),
              }
              res.send(finalgame);
        } catch (error) {
            next(error)
                }
              }
    }
    
    
 
    
    
    module.exports= {
        getGameId,
    }