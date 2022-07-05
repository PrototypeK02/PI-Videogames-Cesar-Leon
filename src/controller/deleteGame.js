const {Videogame, Genre} = require("../db");


 async function deletefromDB(req,res) {
    let {id} = req.params
    try {
        
        let destroGame = await Videogame.findOne({
            where: {
              id
            },
           
      
        })
      console.log(destroGame)
         await destroGame.destroy()
         res.status(202).send("You just destroyed your VideoGame :(")

    } catch (error) {
        res.status(404).send("Game not found")
    }

    

}

module.exports = {
    deletefromDB,
}