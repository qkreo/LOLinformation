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
                return res.status(200).send(summoner);
            } else {
                
                const summoner = await this.matchesService.getLeagueList();

                return res.status(200).send(summoner);
            }
        } catch (err) {
            return next(err);
        }
    };

    save = async (req, res, next) => {
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
        const { championId } = req.params;

        try {
            const winRating = await this.matchesService.getWinRatingByChamp(
                championId
            );

            return res.status(200).send(winRating);
        } catch (err) {
            return next(err);
        }
    };
}

module.exports = MatchesController;
