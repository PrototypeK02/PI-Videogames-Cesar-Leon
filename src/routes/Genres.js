const express = require('express');
const  {getGenresFromDB} = require('../controller/getGenres');
const router = express.Router();

router.get("/genres",getGenresFromDB)

module.exports= router