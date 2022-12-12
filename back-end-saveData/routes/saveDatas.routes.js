const express = require('express');
const router = express.Router();
const SaveDataController = require ('../controllers/saveDatas.controller');

const saveDataController = new SaveDataController()
// /saveData/
router.get('/matchlist', saveDataController.getMatchList) // 매치 리스트 저장
router.get('/summonerMatchlist/:summonerName', saveDataController.getSummoner) // 소환사 이름으로 단일 소환사 매치 리스트 저장
router.get('/matchData/:tier', saveDataController.saveMatchData) // 매치데이터 업데이트
router.put('/rating', saveDataController.saveRating) 


module.exports = router;