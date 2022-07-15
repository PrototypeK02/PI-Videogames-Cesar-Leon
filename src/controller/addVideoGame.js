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
        
        if(!name || name === ""||!platform || platform.length < 1 || !genre  || genre.length < 1) {
            throw new Error("Not enough elements for this game")
        }

        if(!description || description.length < 30) {
            throw new Error("Description is too short")
        }

        if(typeof(Number(rating)) !== "number" || rating < 1) {
            throw new Error("Rating must be a valid number")
        }
        
        let nametoCreate = name.replace(/[^A-ZñÑ0-9]+/ig, " ").trim()  
        //console.log(nametoCreate)
        let searchGameNameDB = await Videogame.findAll({
            where: {
                name:  nametoCreate
                
            }
        })
        

        if(!searchGameNameDB.length || searchGameNameDB.length < 1) {

            
                let nameToApiSearch = name.replace(/[^A-Z0-9]+/ig, "");    
                
        

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
            //console.log(top15)
            if(top15.length > 0 ) {
                throw new Error("VideoGame already exists")
            }

            else{
                nametoCreate = nametoCreate[0].toUpperCase() + nametoCreate.slice(1)
               await Videogame.create({name: nametoCreate, description, releaseDate: !releaseDate ? "1958/10/04": releaseDate, image: !image ? "https://s3.envato.com/files/10065422/Extra%20Previews/06_Preview6.png": image, rating: !rating ? "0"  : rating, platform})
                let coco2 = await Videogame.findOne({
                    where: {
                        name: nametoCreate
                    }
                })
                if(genre) {
                   let genresetter= genre.map(el => {return el.id})
                  // console.log(nametoCreate)
                    await coco2.setGenres(genresetter)
                }
            }

               return res.status(201).send("VideoGame created Succefully!")
            

           
            
            
            
        

        }
        else{
         return  res.status(400).send(error.message)
        }
    
        } catch (error) {
           return res.status(400).send(error.message)
        }
    }
 

    module.exports={
        addVideoGame
    }