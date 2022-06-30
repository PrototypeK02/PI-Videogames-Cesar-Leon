const axios = require("axios")
require('dotenv').config();
const {YOUR_API_KEY} = process.env
const {Genre} = require('../db')

async function getGenresDB(){
   
    
    try {
        let genres = (await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)).data.results.map(el => ({id: el.id, name: el.name,}))
        Genre.bulkCreate(genres)
        
       
    } catch (error) {
       console.log(error)
    }
}


 async function getGenresFromDB(req,res,next) {

    try {
        let GenrestoSend = await Genre.findAll()
        
        res.json(GenrestoSend)
        
    } catch (error) {
        next(error)
    }

        

        
}
    
    
    module.exports= {
        
        getGenresDB,
        getGenresFromDB
    }