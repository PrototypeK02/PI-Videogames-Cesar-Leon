const { Router } = require('express');
const videoGames = require("./videoGamesALL")
const videoGameName = require("./videoGameName")
const videoGameId = require("./videoGameId")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(videoGames)
router.use(videoGameName)
router.use(videoGameId)
module.exports = router;
