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
        //시퀄라이즈 사용시 같은 테이블을 조인할 수 없는 문제가있었고 직접적으로 쿼리문으로 같은 테이블을 조인시킴
        // studio 3T에서는 동일한 컬럼을 조인해와도 같이 표기할수 있었지만 vs코드에선 동일한 컬럼명을 가진것들은 키가 중복돼서 원하던 결과값이 나오지않았음
        // 그래서 조인한 테이블의 키 와 메인 테이블의 키 를 조정하여 원하는 결과값이 나오게 수정
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
