const express = require('express');
const getGameId  = require('../controller/videoGameId');
const router = express.Router();

router.get("/api/videogames/:id", getGameId.getGameId)

module.exports= router