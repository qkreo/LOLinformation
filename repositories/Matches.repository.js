const { summoners, MatchData, MatchList } = require('../models');

class MatchesRepository {
    // findUserList = async () => {
    //     return await summoners.find({tier:"DIAMOND"})
    // }

    findMatchById = async (matchId) => {
        return await MatchData.findOne({ where: { matchId } });
    };

    findMatchList = async (matchId) => {
        return await MatchList.findOne({ where: { matchId } });
    };

    findMatch = async () => {
        return await MatchList.findAll({
            attributes: ['matchId'],
        });
    };

    saveMatchList = async (matchId) => {
        await MatchList.create(matchId);
    };

    saveMatchData = async (matchData) => {
        await MatchData.create(matchData);
    };

    getChampionById = async (championId, tier) => {
        const matchDataByChampion = await MatchList.findAll({
            where: { tier },
            attributes: ['matchId'],
            include: {
                model: MatchData,
                where: { championId },
                attributes: ['championId', 'championName', 'itemList'],
            },
        });

        console.log(matchDataByChampion[0].dataValues.MatchData[0].dataValues.itemList.split(','))

        return matchDataByChampion;
    };

    // getChampionByIdtest = async (championId) => {

    //     const champion = await Challenger.find({ championId: championId });

    //     return champion;

    // }

    getEnemyById = async (championId, matchData) => {
        let enemy = [];

        // for (let i = 0; i < matchData.length; i++) {

        const result = await Challenger.find(
            {
                matchData,
                // championId: {$ne : championId },
                // matchId: ,
                // individualPosition: matchData[i].individualPosition
            },
            {
                _id: 0,
                championId: 1,
                individualPosition: 1,
                championName: 1,
                win: 1,
            }
        );

        console.log(result);
        // enemy.push(result)

        // }

        // console.log(enemy)
    };
}

module.exports = MatchesRepository;
