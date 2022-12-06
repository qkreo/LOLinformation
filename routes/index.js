const express = require('express');
const router = express.Router();

const matchesRouter = require('./Matchs.routes')
const saveDataRouter = require('./SaveDatas.routes')


router.use('/saveData', saveDataRouter)
router.use('/match', matchesRouter)

module.exports = router;
