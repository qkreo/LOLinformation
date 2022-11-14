const express = require('express');
const router = express.Router();
const matchesRouter = require('./Match.routes')


const UserRouter = require('./searchUser.js') 

router.use('/summoner',UserRouter)
router.use('/match', matchesRouter)


module.exports = router;
