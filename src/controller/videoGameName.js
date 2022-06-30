const axios = require("axios")
require('dotenv').config();
const {YOUR_API_KEY} = process.env
const {Videogame,Op} = require("../db")
const formatObjectHome = require("../utils/formatObject")
function isMatch(textToMatch, textField){
    
    let pattern = `\\b${textToMatch}\\b`;
    let regExp = new RegExp(pattern, 'g');
    let isMatch = regExp.test(textField)
    return isMatch

}


async function getAllNames(name) {
    let nameDB = await Videogame.findAll({
        where:{
            name:{
                 [Op.like]: `%${name}%`
            } 
        }
    })
    
    nameDB = nameDB.map(el => formatObjectHome.formatObjectHome(el))
   
    

        try {
            if(!name || name === "" || name === " ") {throw new Error("You have to enter a Videogame Name")}
            let approximateName = name.replace(/[^A-Z0-9]+/ig, "-").toLowerCase()
            let exactName = name.replace(/[^A-Z0-9]+/ig, " ").trim().toLowerCase()
            let games = (await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&search=${approximateName}`)).data.results
            if(games.length === 0 && !nameDB) {
             throw new Error("VideoGame not Found")
            }
       
            let top15 = games.map(el => {
                return formatObjectHome.formatObjectHome(el)
            
            }).filter(el => {
                let eltoLower = el.name.toLowerCase()
                if (name === "pokemon") {return el}
                if(eltoLower.includes("-")) {return el}
                if(isMatch("v",eltoLower) || isMatch("iv",eltoLower) || isMatch("iii",eltoLower) || isMatch("2",eltoLower) || isMatch("and",eltoLower)) {
                    if(eltoLower.includes(exactName.replace(/[^A-Z" "]+/ig, "")) || typeof eltoLower.split(" ")[1] === "Number") {
                    return el
                    }
                }
                if(isMatch(exactName,eltoLower)) {
                    return el
                }
                

            })
            if(top15.length < 1 && !nameDB) {
                throw new Error("VideoGame Not Found")
            }
            
            top15 = top15.slice(0,15).concat(nameDB)
           
           console.log(nameDB)
           return top15
    
        } catch (error) {
            throw new Error("VideoGame not found")
        }
    }
 
    
    
    module.exports= {
        getAllNames,
    }