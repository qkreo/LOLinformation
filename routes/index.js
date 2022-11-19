const express = require('express');
const router = express.Router();

const matchesRouter = require('./Match.routes')

router.use('/match', matchesRouter)


module.exports = router;
