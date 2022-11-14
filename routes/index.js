const express = require('express');
const router = express.Router();
const matchesRouter = require('./Match.routes')

router.get('/', (req, res, next) => {
    console.log("메인페이지")
    res.send("home")
})
router.use('/match', matchesRouter)

module.exports = router;
