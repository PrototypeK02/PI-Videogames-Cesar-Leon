const express = require('express');
const  {addVideoGame} = require('../controller/addVideoGame');
const router = express.Router();

router.post("/videogames",addVideoGame)

module.exports= router