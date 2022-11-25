const Endpoint = require('leaguejs/lib/Endpoint');
const { summoners, MatchData, MatchList, Rating } = require('../models');
const { Op } = require('sequelize')

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

    findMatch = async (tier) => {
        return await MatchList.findAll({
            where: {tier},
            attributes: ['matchId'],
        });
    };

    saveMatchList = async (matchId) => {
        try {
            await MatchList.create(matchId);
        } catch (err) {
            return
        }
        
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
