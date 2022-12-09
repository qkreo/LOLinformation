const SaveDataService = require('../services/SaveDatas.service.js');

class SaveDataController {
    saveDataService = new SaveDataService();
    getSummoner = async (req, res, next) => {
        try {
            const { summonerName } = req.body; // 띄어쓰기가 정확해야함

            const summoner = await this.saveDataService.getAccount(
                summonerName
            );
            return res.json({ message: summoner });
        } catch (err) {
            return next(err);
        }
    };
    getMatchList = async (req, res, next) => {
        const { division, tier, page } = req.query;
        try {
            if (division && tier && page) {
                const summoner = await this.saveDataService.getTierList(
                    division,
                    tier.toUpperCase(),
                    page
                );
                return res.json({ message: summoner });
            } else {
                const summoner = await this.saveDataService.getLeagueList();

                return res.json({ message: summoner });
            }
        } catch (err) {
            return next(err);
        }
    };

    saveMatchData = async (req, res, next) => {
        try {
            const { tier } = req.params;
            const list = await this.saveDataService.saveMatchData(
                tier.toUpperCase()
            );
            return res.status(200).send(list);
        } catch (err) {
            return next(err);
        }
    };

    saveRating = async (req, res, next) => {
        try {
            const result = await this.saveDataService.saveRatings();
            res.status(200).send(result);
        } catch (err) {
            return next(err);
        }
    };
}

module.exports = SaveDataController;
