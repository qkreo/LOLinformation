const axios = require('axios');
const MatchesService = require('../services/Matches.service.js');

class MatchesController {
    matchesService = new MatchesService();

    getChampion = async (req, res, next) => {
        const { championId } = req.params;
        try {
            const champion = await this.matchesService.getChampion(championId);

            return res.status(200).send(champion);
        } catch (err) {
            return next(err);
        }
    };

    getItem = async (req, res, next) => {
        const { itemId } = req.params;
        try {
            const item = await this.matchesService.getItem(itemId);

            return res.status(200).json(item);
        } catch (err) {
            return next(err);
        }
    };

    getSummoner = async (req, res, next) => {
        const { summonerName } = req.params;
        
        try {
            const summoner = await this.matchesService.getSummoner(
                summonerName
            );
            
            if(summoner.length < 1) {
                axios.get(`https://sparta-pmg.shop/saveData/summonerMatchlist/${summonerName}`)
                return res.status(201).send("현재 전적 데이터가 존재하지않는 소환사입니다. 데이터 계산 중이오니 잠시만 기다려주세요.")
            } else {
                return res.status(200).json(summoner);
            }
        } catch (err) {
            return next(err);
        }
    };

    saveRating = async (req, res, next) => {
        try {
            const result = await this.matchesService.saveRating();

            res.status(200).send(result);
        } catch (err) {
            return next(err);
        }
    };

    getWinRatingByChamp = async (req, res, next) => {
        const { myChampionId, enemyChampionId } = req.params;

        try {
            const winRating = await this.matchesService.getWinRatingByChamp(
                myChampionId,
                enemyChampionId
            );

            return res.status(200).send(winRating);
        } catch (err) {
            return next(err);
        }
    };
}

module.exports = MatchesController;
