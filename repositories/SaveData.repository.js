const { sequelize, MatchData, MatchList, Rating } = require('../models');

class SaveDataRepository {
 // 기존엔 find 메소드와 created 메소드를 분리해서 사용했으나 인터벌 사용 도중 동일한 matchId를 연속적으로 저장하려할시 sql충돌 에러가 뜨면서 서버가 다운됨
 // 그래서 findOrCreate메소드로 변경하여 충돌 방지
    saveMatchList = async (matchId) => {
        const [user, created] = await MatchList.findOrCreate({
            where:{matchId:matchId.matchId},
            defaults: {matchId:matchId.matchId,tier:matchId.tier},
            logging: false});
            return created
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
        // const [user, created] = await matchData.findOrCreate({
        //     where:{matchId:matchData.matchId},
        //     defaults: matchData,
        //     logging: false});
        //     return created
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
