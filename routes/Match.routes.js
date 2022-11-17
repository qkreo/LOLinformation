const express = require('express');
const router = express.Router();
const MatchesController = require ('../controllers/Matches.controller');
const matchesController = new MatchesController()

router.get('/:sumNum/:num', matchesController.getMatchData)
router.get('/:championName', matchesController.getChampion)

module.exports = router;