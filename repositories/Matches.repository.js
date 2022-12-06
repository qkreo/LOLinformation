const { sequelize, Summoners, MatchData, MatchList, Rating } = require('../models');

const { Op } = require('sequelize');

class MatchesRepository {

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

    getSummoner = async (summonerNameInsert) => {
        const [result , metadata] = await sequelize.query(`
        SELECT
        matchTier,
        championId,
        championName,
        itemList,
        summonerName,
        win
        FROM MatchData md
        WHERE 
        summonerName = '${summonerNameInsert}'
        `)

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
