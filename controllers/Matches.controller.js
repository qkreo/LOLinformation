const MatchesService = require('../services/Matches.service.js');

class MatchesController {
    matchesService = new MatchesService();

    getMatchData = async (req, res, next) => {
        const { division, tier, page } = req.query;
        try {
            if (division && tier && page) {
                
                const summoner = await this.matchesService.getTierList(
                    division,
                    tier.toUpperCase(),
                    page
                );
                return res.json({message:summoner});
            } else {
                
                const summoner = await this.matchesService.getLeagueList();

                return res.json({message:summoner});
            }
        } catch (err) {
            return next(err);
        }
    };

    saveMatchData = async (req, res, next) => {
        try {
            const { tier } = req.params;
            const list = await this.matchesService.saveMatchData(
                tier.toUpperCase()
            );
            return res.status(200).send(list);
        } catch (err) {
            return next(err);
        }
    };

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

    saveRating = async (req, res, next) => {

        try {
            const result = await this.matchesService.saveRating();

            res.status(200).send(result)
        } catch (err) {
            return next(err);
        }
    }

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
