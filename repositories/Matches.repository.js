const { sequelize, Summoners, MatchData, MatchList, Rating } = require('../models');

const { Op } = require('sequelize');

//models.sequelize.query() 직접 쿼리문 실행시
// findOrCreate()
// query =  `(SELECT
//     find.championName,
//     find.itemList,
//     find.win,
//     md.championName,
//     md.itemList,
//     md.win
//     FROM MatchData md
// INNER JOIN(SELECT matchId,
//                 championName,
//                 individualPosition,
//                 itemList,
//                 win
//             from MatchData md
//             WHERE championId = ${findChamp})
// as find
// on find.matchId = md.matchId
// where md.individualPosition = find.individualPosition and md.championId = ${enemyChamp}
// and md.championId != ${findChamp})`

class MatchesRepository {

    findMatchList = async (matchId) => {
        return await MatchList.findOne({ logging: false,where: { matchId } });
    };

    saveMatchList = async (matchId) => {
        return await MatchList.create(matchId);
    };

    deleteMatchList = async (matchId) => {
        await MatchList.destroy({ where: { matchId } });
    };

    getMatchDataList = async (tier) => {
        return await MatchList.findAll({
            where: { tier },
            attributes: ['matchId', 'tier'],
            order: [['createdAt', 'DESC']],
        });
    };

    findMatchById = async (matchId) => {
        return await MatchData.findOne({logging: false, where: { matchId } });
    };

    saveMatchData = async (matchData) => {
        await MatchData.create(matchData);
    };

    getMatchByTier = async (tier) => {
        const match = await MatchList.findAll({
            where: { tier },
            attributes: ['matchId'],
        });

        return match;
    };

    getChampionById = async (championId, tier) => {
        const [result, metadata] = await sequelize.query(`
                    SELECT 
                    matchTier,
                    championId,
                    championTransform,
                    itemList,
                    win 
                    FROM MatchData md 
                    WHERE 
                    championId = ${championId}
                    `);

        if(result) {return result} else { return }
    };

    saveRating = async (rateByitemResult) => {
        rateByitemResult.forEach(async (data) => {
            const existData = await Rating.findOne({
                where: {
                championId: data.championId,
                itemId: data.itemId,
                tier: data.tier,
                },
            });

            if (!existData && data.pickRate > 2) {
                await Rating.create(data);
            } else if (data.pickRate > 2 && data.totalMatch > existData.dataValues.totalMatch) {
                await Rating.update(data, {
                    where: {
                        championId: data.championId,
                        itemId: data.itemId,
                        tier: data.tier,
                    },
                });
            }
        }) 
    };

    getChampion = async (championId) => {
        const result = await Rating.findAll({
            where: {
                championId: championId,
                pickRate: { [Op.gte]: 2 },
            },
            attributes: [
                'championId',
                'tier',
                'itemId',
                'totalMatch',
                'pickRate',
                'winRate',
            ],
            order: [['pickRate', 'DESC']],
        });

        return result;
    };

    getItemById = async (itemId) => {
        const result = await Rating.findAll({
            where: {
                itemId: itemId,
                pickRate: { [Op.gte]: 30 }
            },
            attributes: [
                'championId',
                'tier',
                'itemId',
                'totalMatch',
                'pickRate',
                'winRate',
            ],
            order: [['tier', 'DESC']]
        })

        return result;
    }

    getEnemyById = async (myChampionId, enemyChampionId) => {
        const [result, metadata] = await sequelize.query(`SELECT
            matchTier,
            championId,
            find.championName,
            find.championTransform,
            find.itemList,
            find.win
            FROM MatchData md 
        INNER JOIN(SELECT matchId,
                        championName,
                        championTransform,
                        teamPosition,
                        itemList,
                        win
                    from MatchData md 
                    WHERE championId = ${myChampionId}) 
        as find
        on find.matchId = md.matchId
        where md.teamPosition = find.teamPosition
        and md.championId = ${enemyChampionId} 
        and md.championId != ${myChampionId} `);
        return result;
    };
}

module.exports = MatchesRepository;
