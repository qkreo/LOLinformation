const summoners = require('../models/summoners.js');
const matches = require('../models/Match.js');
const Bronze = require('../models/Bronze')
const Silver = require('../models/Silver')
const Gold = require('../models/Gold')
const Platinum = require('../models/Platinum')
const Diamond = require('../models/Diamond')
const Master = require('../models/Master')
const Grandmaster = require('../models/Grandmaster')
const Challenger = require('../models/Challenger')

class MatchesRepository {
    findMatchById = async (matchid) => {
        const match = await matches.findOne({ matchId: matchid });

        return match;
    };

    saveMatchData = async (userMatchData) => {
        const matchData = await userMatchData.info.participants.map((data) => {
            matches.create({
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

    getChampionByName = async (championName) => {
        const champion = await matches.find({ championName: championName });

        return champion;
    };
}

module.exports = MatchesRepository;
