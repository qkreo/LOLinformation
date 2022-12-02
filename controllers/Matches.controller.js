const MatchesService = require('../services/Matches.service.js');

class MatchesController {
    matchesService = new MatchesService();

    getEnemyById = async (req, res, next) => {
        try {
        const { myChampionId, enemyChampionId } = req.query;
        const rate = await this.matchesService.getEnemyById(myChampionId, enemyChampionId)
        return res.status(200).send(rate);

        } catch(err) {
            return next(err);
        }
        
    }

    getChampion = async (req, res, next) => {
        const { championId } = req.params;
        try {
            const champion = await this.matchesService.getChampion(championId);

            return res.status(200).send(champion);
        } catch (err) {
            return next(err);
        }
    };

    getWinRatingByChamp = async (req, res, next) => {
        const { myChampionId, enemyChampionId } = req.params;

        try {
            const winRating = await this.matchesService.getWinRatingByChamp(
                myChampionId, enemyChampionId
            );

            return res.status(200).send(winRating);
        } catch (err) {
            return next(err);
        }
    };
}

module.exports = MatchesController;
