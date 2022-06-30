const axios = require("axios");
const {Videogame, Op} = require("../db");
require('dotenv').config();
const {YOUR_API_KEY} = process.env
const formatObjectHome = require("../utils/formatObject")


async function addVideoGame(req,res,next) {

    function isMatch(textToMatch, textField){
    
        let pattern = `\\b${textToMatch}\\b`;
        let regExp = new RegExp(pattern, 'g');
        let isMatch = regExp.test(textField)
        return isMatch
    
    }

    let {name,description,releaseDate,image,rating,platform,genre} = req.body
    
    try {
        
        if(!name || name === ""||!platform || platform.length < 1 || !genre) {
            throw new Error("Not enough elements for this game")
        }

        if(!description || description.length < 30) {
            throw new Error("Description is too short")
        }
        
        let nametoCreate = name.replace(/[^A-Z0-9" "]+/ig, "").trim()  

        let searchGameNameDB = await Videogame.findAll({
            where: {
                name:  nametoCreate
                
            }
        })
        

        if(!searchGameNameDB.length || searchGameNameDB.length < 1) {

            
                let nameToApiSearch = name.replace(/[^A-Z0-9]+/ig, "-");    
                
        

            let games = (await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&search=${nameToApiSearch}`)).data.results
           
            
            let top15 = games.map(el => {
                return formatObjectHome.formatObjectHome(el)
            

            }).filter(el => {
                let eltoLower = el.name.toLowerCase()
                if(eltoLower.includes("-")) {return el}
                if(isMatch("v",eltoLower) || isMatch("iv",eltoLower) || isMatch("iii",eltoLower) || isMatch("2",eltoLower) || isMatch("and",eltoLower)) {
                    if(eltoLower.includes(nametoCreate.replace(/[^A-Z" "]+/ig, "")) || typeof eltoLower.split(" ")[1] === "Number") {
                    return el
                    }
                }
                if(isMatch(nametoCreate,eltoLower)) {
                    return el
                }
                

                

            })
            console.log(top15)
            if(top15.length > 0 ) {
                throw new Error("VideoGame already exists")
            }

            else{
               await Videogame.create({name, description, releaseDate: !releaseDate ? "1958/10/04": releaseDate, image: !image ? "https://s3.envato.com/files/10065422/Extra%20Previews/06_Preview6.png": image, rating: !rating ? "0"  : rating, platform})
                let coco2 = await Videogame.findOne({
                    where: {
                        name
                    }
                })
                if(genre) {
                   let genresetter= genre.map(el => {return el.id})
                    await coco2.setGenres(genresetter)
                }
            }

                res.status(201).send("VideoGame created Succefully!")
            

           
            
            
            
        

        }
        else{
           res.status(400).send("VideoGame already exists")
        }
    
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
 

    module.exports={
        addVideoGame
    }