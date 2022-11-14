const express = require('express');
const router = express.Router();

const UserRouter = require('./searchUser.js') 

router.use('/summoner',UserRouter)

module.exports = router;
