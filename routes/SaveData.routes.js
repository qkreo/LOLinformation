const express = require('express');
const router = express.Router();
const SaveDataController = require ('../controllers/saveData.controller');
const saveDataController = new SaveDataController()
// /saveData/
router.post('/matchlist', saveDataController.getMatchList) // 매치 리스트 저장
router.post('/matchData/:tier', saveDataController.saveMatchData) // 단일 매치 저장 
router.put('/rating', saveDataController.saveRating)


module.exports = router;