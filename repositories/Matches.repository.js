const { sequelize,summoners, MatchData, MatchList } = require('../models');



class MatchesRepository {
    // findUserList = async () => {
    //     return await summoners.find({tier:"DIAMOND"})
    // }

    findMatchList = async (matchId) => {
        return await MatchList.findOne({ logging: false,where: { matchId } });
    };

        
    saveMatchList = async (matchId) => {

        return await MatchList.create(matchId);
    };

    deleteMatchList = async (matchId) => {
        await MatchList.destroy({where:{matchId}})
    }

    getMatchDataList = async (tier) => {
        return await MatchList.findAll({
            where: {tier},
            attributes: ['matchId','tier'],
            order: [["createdAt", "DESC"]]
        });
    };

    findMatchById = async (matchId) => {
        return await MatchData.findOne({logging: false, where: { matchId } });
    };

    saveMatchData = async (matchData) => {
        await MatchData.create(matchData);
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
                    WHERE championId = ${championId}
                    `)
        // const matchDataByChampion = await MatchList.findAll({
        //     where: { tier },
        //     attributes: ['matchId'],
        //     order: [["createdAt", "DESC"]],
        //     include: {
        //         model: MatchData,
        //         where: { championId },
        //         attributes: ['championId', 'championName', 'itemList', 'win'],
        //         order: [["createdAt", "DESC"]]
        //     },
        // });
        console.log(result)
        return result;
    };


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
        and md.championId != ${myChampionId} `)
            console.log(result)
    return result
    };
}

module.exports = MatchesRepository;
