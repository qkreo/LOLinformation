const express = require('express');
const router = express.Router();
const summonersRouter = require('../routes/Summoner.routes')

router.get('/', (req, res, next) => {
    console.log("메인페이지")
    res.send("home")
})
router.use('/summoners', summonersRouter)

module.exports = router;
