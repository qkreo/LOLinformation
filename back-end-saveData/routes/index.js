const express = require('express');
const router = express.Router();

const saveDataRouter = require('./saveDatas.routes')


router.use('/saveData', saveDataRouter)


module.exports = router;
