const express = require('express');
const  {deletefromDB} = require('../controller/deleteGame.js');
const router = express.Router();

router.delete("/delete/:id",deletefromDB)

module.exports= router