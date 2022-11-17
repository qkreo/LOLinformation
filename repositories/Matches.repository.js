const summoners = require('../models/summoners.js');
// const matches = require('../models/Match.js');
const Bronze = require('../models/Bronze')
const Silver = require('../models/Silver')
const Gold = require('../models/Gold')
const Platinum = require('../models/Platinum')
const Diamond = require('../models/Diamond')
const Master = require('../models/Master')
const Grandmaster = require('../models/Grandmaster')
const Challenger = require('../models/Challenger')

class MatchesRepository {

    // getUserPuuid = async () => {

    //     const summoner = await summoners.find({ tier : "grandmaster"})

    //     const result = summoner.map((data) => {
    //        return data.puuid
    //     })
        
    //     return result;

    // }

    findMatchById = async (matchid) => {
        const match = await Grandmaster.findOne({ matchId: matchid });

        return match;
    };

    saveMatchData = async (userMatchData) => {
        const matchData = await userMatchData.info.participants.map((data) => {
            Grandmaster.create({
                matchId: userMatchData.metadata.matchId,
                championId: data.championId,
                championName: data.championName,
                championTransform: data.championTransform,
                individualPosition: data.individualPosition,
                item0: data.item0,
                item1: data.item1,
                item2: data.item2,
                item3: data.item3,
                item4: data.item4,
                item5: data.item5,
                item6: data.item6,
                lane: data.lane,
                perks: data.perks,
                puuid: data.puuid,
                role: data.role,
                summoner1Id: data.summoner1Id,
                summoner2Id: data.summoner2Id,
                summonerId: data.summonerId,
                summonerName: data.summonerName,
                teamPosition: data.teamPosition,
                win: data.win,
            });
        });

        return matchData;
    };

    getChampionById = async (championId, tier) => {
        // console.log(tier)
        if(tier === 'challenger') {
            const champion = await Challenger.find({ championId: championId });

            return champion;
        } else if (tier === 'grandmaster') {
            const champion = await Grandmaster.find({ championId: championId });

            return champion;
        } else if (tier === 'master') {
            const champion = await Master.find({ championId: championId });

            return champion;
        } else if (tier === 'diamond') {
            const champion = await Diamond.find({ championId: championId });

            return champion;
        } else if (tier === 'platinum') {
            const champion = await Platinum.find({ championId: championId });

            return champion;
        } else if (tier === 'gold') {
            const champion = await Gold.find({ championId: championId });

            return champion;
        } else if (tier === 'silver') {
            const champion = await Silver.find({ championId: championId });

            return champion;
        } else if (tier === 'bronze') {
            const champion = await Bronze.find({ championId: championId });

            return champion;
        }
        
    };

    getChampionByIdtest = async (championId) => {
        
        const champion = await Challenger.find({ championId: championId });

        return champion;

    }

    getEnemyById = async (championId, match) => {

        let enemy = {};

        // for (let i = 0; i < championMatchData.length; i++) {

            let result = await Challenger.find({ 
                championId: {$ne : championId },
                matchId: match.matchId,
                // individualPosition: match.individualPosition
            });


            console.log(result)
        // }

        
        
        
        

        // console.log(enemy)

        // return enemy;
    }

}

module.exports = MatchesRepository;
