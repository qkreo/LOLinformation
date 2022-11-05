const express = require('express');
const router = express.Router();
const SummonersController = require ('../controllers/Summoner.controller');
const summonersController = new SummonersController()


router.get('/', summonersController.getUserData)

module.exports = router;