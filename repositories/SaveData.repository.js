const { sequelize, Summoners, MatchData, MatchList, Rating } = require('../models');

const { Op } = require('sequelize');

class SaveDataRepository {
    //불필요한 로그가 쌓이지 않도록 find 메소드의 로그는 로깅되지않게 수정
    findMatchList = async (matchId) => {
        return await MatchList.findOne({ logging: false,where: { matchId } });
    };

    saveMatchList = async (matchId) => {
        return await MatchList.create(matchId,{logging: false});
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
        await MatchData.create(matchData,{logging: false});
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
                logging: false,
                where: {
                championId: data.championId,
                itemId: data.itemId,
                tier: data.tier,
                },
            });
            if (!existData && data.pickRate > 2) {
                await Rating.create(data,{logging: false});
            } else if (data.pickRate > 2 && data.totalMatch > existData.dataValues.totalMatch) {
                await Rating.update(data, {
                    logging: false,
                    where: {
                        championId: data.championId,
                        itemId: data.itemId,
                        tier: data.tier,
                    },
                });
            }
        }) 
    };


}
module.exports = SaveDataRepository;
