const express = require('express');
const router = express.Router();
const MatchesController = require ('../controllers/Matches.controller');
const matchesController = new MatchesController()


router.get('/:sumNum/:num', matchesController.getMatchData)
router.get('/:championId', matchesController.getChampion)
router.get('/:championId/enemy', matchesController.getWinRatingByChamp)

module.exports = router;