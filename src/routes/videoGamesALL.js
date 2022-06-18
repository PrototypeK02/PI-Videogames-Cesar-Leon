const express = require('express');
const router = express.Router();
const getAllGames = require("../controller/videoGames")


router.get("/api/videogames", getAllGames.getAllGames)

module.exports= router