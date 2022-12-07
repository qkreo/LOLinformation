const express = require('express');
const router = express.Router();
const SaveDataController = require ('../controllers/SaveDatas.controller');

const saveDataController = new SaveDataController()
// /saveData/
router.get('/summonerMatchlist', saveDataController.getSummoner) // 매치 리스트 저장
router.get('/matchlist', saveDataController.getMatchList) // 매치 리스트 저장
router.get('/matchData/:tier', saveDataController.saveMatchData) // 단일 매치 저장 
router.put('/rating', saveDataController.saveRating)


module.exports = router;