const { summoners, MatchData, MatchList, Rating } = require('../models');
const { Op } = require('sequelize')

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
    // findUserList = async () => {
    //     return await summoners.find({tier:"DIAMOND"})
    // }


    findMatchList = async (matchId) => {
        return await MatchList.findOne({ where: { matchId } });
    };

        
    saveMatchList = async (matchId) => {

        return await MatchList.create(matchId);
    };

    deleteMatchList = async (matchId) => {
        await MatchList.destroy({where:{matchId}})
    }

    findMatch = async (tier) => {
        return await MatchList.findAll({
            where: {tier},
            attributes: ['matchId','tier'],
            order: [["createdAt", "DESC"]]
        });
    };

    findMatchById = async (matchId) => {
        return await MatchData.findOne({ where: { matchId } });
    };

    saveMatchData = async (matchData) => {
        await MatchData.create(matchData);
    };

    getMatchByTier = async (tier) => {
        const match = await MatchList.findAll({where:{tier},attributes: ['matchId']})

        return match;
    }

    getChampionById = async (championId, tier) => {


        const matchDataByChampion = await MatchList.findAll({
            where: { tier },
            attributes: ['matchId'],
            order: [["createdAt", "DESC"]],
            include: {
                model: MatchData,
                where: { championId },
                attributes: ['championId', 'itemList', 'win'],
            },
        });

        return matchDataByChampion;
    };

    saveRating = async (winRateByItem) => {


        const existData = await Rating.findOne({where: {
            championId: winRateByItem.championId, 
            itemId: winRateByItem.itemId,
            tier: winRateByItem.tier,
        }})


        if(!existData) {
            await Rating.create(winRateByItem);
        } else if (winRateByItem.totalMatch > existData.dataValues.totalMatch) {
            await Rating.update(winRateByItem, {where: {
                championId: winRateByItem.championId, 
                itemId: winRateByItem.itemId,
                tier: winRateByItem.tier,
            }});
        } 
    }

    getChampion = async (championId) => {
        const result = await Rating.findAll({where: {
            championId: championId,
            pickRate: {[Op.gte] : 2}
        }, 
        attributes:[
            "championId",
            "tier",
            "itemId",
            "totalMatch",
            "pickRate",
            "winRate"
        ],
        order:[['pickRate', 'DESC']]})

        return result;
    }

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
