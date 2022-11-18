const summoners = require('../models/summoners.js');

const Bronze = require('../models/Bronze')
const Silver = require('../models/Silver')
const Gold = require('../models/Gold')
const Platinum = require('../models/Platinum')
const Diamond = require('../models/Diamond')
const Master = require('../models/Master')
const Grandmaster = require('../models/Grandmaster')
const Challenger = require('../models/Challenger')

class MatchesRepository {


    findUserList = async () => {
        return await summoners.find({tier:"DIAMOND"})
    }

    findMatchById = async (matchid) => {
        const match = await Diamond.findOne({ matchId: matchid });


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

    getEnemyById = async (championId, matchData) => {

        let enemy = [];
        
        // for (let i = 0; i < matchData.length; i++) {

            const result = await Challenger.find({ matchData
                // championId: {$ne : championId },
                // matchId: ,
                // individualPosition: matchData[i].individualPosition
            },{_id: 0, championId: 1, individualPosition: 1, championName: 1, win: 1});

            console.log(result);
            // enemy.push(result)

        // }
        
        // console.log(enemy)
    }

}

module.exports = MatchesRepository;
