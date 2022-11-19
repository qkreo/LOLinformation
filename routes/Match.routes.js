const express = require('express');
const router = express.Router();
const MatchesController = require ('../controllers/Matches.controller');
const matchesController = new MatchesController()

router.get('/', matchesController.getMatchData) // 매치 리스트 저장

router.get('/save', matchesController.save) // 단일 매치 저장 

router.get('/:championId', matchesController.getChampion)
router.get('/:championId/enemy', matchesController.getWinRatingByChamp)

module.exports = router;