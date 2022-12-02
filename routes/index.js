const express = require('express');
const router = express.Router();

const matchesRouter = require('./Match.routes')
const saveDataRouter = require('./SaveData.routes')

router.use('/saveData', saveDataRouter)
router.use('/match', matchesRouter)

module.exports = router;
