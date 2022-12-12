const express = require('express');
const router = express.Router();
const matchesRouter = require('./Matchs.routes')

router.use('/match', matchesRouter)

module.exports = router;
