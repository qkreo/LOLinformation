const { sequelize, Summoners, MatchData, MatchList, Rating } = require('../models');

const { Op } = require('sequelize');

class SaveDataRepository {

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
