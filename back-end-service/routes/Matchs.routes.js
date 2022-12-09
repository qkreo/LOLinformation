const express = require('express');
const router = express.Router();
const MatchesController = require ('../controllers/Matches.controller');
const matchesController = new MatchesController()

// /match/

router.get('/enemy', matchesController.getEnemyById)
router.get('/summoner/:summonerName', matchesController.getSummoner)
router.get('/:championId', matchesController.getChampion)
router.get('/:myChampionId/:enemyChampionId', matchesController.getWinRatingByChamp)


module.exports = router;