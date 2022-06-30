const axios = require("axios");
const {Videogame} = require("../db");
const {Genre}= require("../db");
require('dotenv').config();
const {YOUR_API_KEY} = process.env
const formatObjectHome = require("../utils/formatObject")


 async function addVideoGame1(req,res,next) {

let genre = ['Action']
 await Videogame.create({name: "Cocorita", description: "description", rating: 3.5, platform: ["xbox"]})
let coco2 = await Videogame.findOne({
    where: {
        name: "Cocorita"
    }
})
 await coco2.setGenres(4)

 

 let coca = await Videogame.findOne({
    where: {
        name: 'Cocorita',
    },
        include: {
            model: Genre,
            attributes: ["name"]
        }
    
}) 

let cocoto = await coca.getGenres()
 console.log(cocoto[0])
 }

 module.exports={
    addVideoGame1
 }