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

    // getChampionById = async (championId, tier) => {
    //     // console.log(tier)
    //     if(tier === 'challenger') {
    //         const champion = await Challenger.find({ championId: championId });

    //         return champion;
    //     } else if (tier === 'grandmaster') {
    //         const champion = await Grandmaster.find({ championId: championId });

    //         return champion;
    //     } else if (tier === 'master') {
    //         const champion = await Master.find({ championId: championId });

    //         return champion;
    //     } else if (tier === 'diamond') {
    //         const champion = await Diamond.find({ championId: championId });

    //         return champion;
    //     } else if (tier === 'platinum') {
    //         const champion = await Platinum.find({ championId: championId });

    //         return champion;
    //     } else if (tier === 'gold') {
    //         const champion = await Gold.find({ championId: championId });

    //         return champion;
    //     } else if (tier === 'silver') {
    //         const champion = await Silver.find({ championId: championId });

    //         return champion;
    //     } else if (tier === 'bronze') {
    //         const champion = await Bronze.find({ championId: championId });

    //         return champion;
    //     }

    // };

    // getChampionByIdtest = async (championId) => {

    //     const champion = await Challenger.find({ championId: championId });

    //     return champion;

    // }

    // getEnemyById = async (championId, matchData) => {

    //     let enemy = [];

    //     // for (let i = 0; i < matchData.length; i++) {

    //         const result = await Challenger.find({ matchData
    //             // championId: {$ne : championId },
    //             // matchId: ,
    //             // individualPosition: matchData[i].individualPosition
    //         },{_id: 0, championId: 1, individualPosition: 1, championName: 1, win: 1});

    //         console.log(result);
    //         // enemy.push(result)

    //     // }

    //     // console.log(enemy)
    // }
}

module.exports = MatchesRepository;
