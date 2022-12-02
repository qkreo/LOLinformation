const express = require('express');
const router = express.Router();
const MatchesController = require ('../controllers/Matches.controller');
const matchesController = new MatchesController()

router.get('/enemy', matchesController.getEnemyById)
router.get('/:championId', matchesController.getChampion)
router.post('/:myChampionId/:enemyChampionId', matchesController.getWinRatingByChamp)

module.exports = router;