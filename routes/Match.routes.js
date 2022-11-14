const express = require('express');
const router = express.Router();
const MatchesController = require ('../controllers/Matches.controller');
const matchesController = new MatchesController()

router.get('/', matchesController.getMatchData)
router.get('/:championName', matchesController.getChampion)

module.exports = router;