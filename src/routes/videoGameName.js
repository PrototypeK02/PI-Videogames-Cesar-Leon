const express = require('express');
const router = express.Router();
const getAllName = require("../controller/videoGameName")


router.get("/api/videogames", getAllName.getAllNames)

module.exports= router