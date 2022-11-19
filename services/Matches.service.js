require('dotenv').config();

const MatchesRepository = require('../repositories/Matches.repository');

const API = require('../apiList');

class MatchesService {
    constructor() {
        this.matchesRepository = new MatchesRepository();
        this.api = new API();
    }

    getLeagueList = async (league) => {
        
        const tierList = await this.api.getLeagueList(league);

        this.getSummoner(tierList);
    };

    gettierList = async (division, tier, page) => {
        const tierList = await this.api.gettierList(division, tier, page);

        this.getSummoner(tierList);
    };

    getSummoner = async (tierList) => {

        try {
            let i = 0;
            console.log(tierList.entries.length)
            const saveMatchInterval = setInterval(async () => {
                if (i === tierList.length) {
                    console.log('=============저장종료=============');
                    clearInterval(saveMatchInterval);
                } else {
    
                    const summoner = await this.api.getSummoner(tierList, i);
    
                    this.getMatchList(summoner);
    
                    i++;
                }
            }, 3000);
        } catch (err) {
            setTimeout(() => {
                this.getSummoner(tierList)
              }, 15000)
        }
    };

    getMatchList = async (summoner) => {
        try {
            const matchList = await this.api.getMatchList(summoner);

            matchList.map(async (match) => {
                const findmatch = await this.matchesRepository.findMatchList(
                    match.matchId
                );
    
                if (!findmatch) this.matchesRepository.saveMatchList(match);
                else console.log("중복");
            });
        } catch (err) {
            setTimeout(() => {
                this.getLeagueList()
              }, 15000)
        }

    };

    saveMatchData = async () => {
        try {
            let i = 0;
            const matchList = await this.matchesRepository.findMatch();
            console.log(matchList.length,"매치리스트")
            const saveMatchInterval = setInterval(async () => {
                if (i === matchList.length) {
                    console.log('=============매치저장종료=============');
                    clearInterval(saveMatchInterval);
                } else {
                    const findMatchId = await this.matchesRepository.findMatchById(
                        matchList[i].matchId
                    );
    
                    if (!findMatchId) {
                        console.log(`${i}번째 매치데이터 저장`)
                        const matchData = await this.api.findMatchData(matchList[i].matchId)
                        matchData.info.participants.map((data) => {
                            this.matchesRepository.saveMatchData({
                                matchId: matchData.metadata.matchId,
                                championId: data.championId,
                                championName: data.championName,
                                championTransform: data.championTransform,
                                individualPosition: data.individualPosition,
                                itemList: `${data.item0},${data.item1},${data.item2},${data.item3},${data.item4},${data.item5}`,
                                puuid: data.puuid,
                                summoner1Id: data.summoner1Id,
                                summoner2Id: data.summoner2Id,
                                summonerId: data.summonerId,
                                summonerName: data.summonerName,
                                teamPosition: data.teamPosition,
                                win: data.win,
                            });
                        });
    
                    } else console.log(`${i}번쨰와 동일한 매치데이터 존재함`);
    
                    i++;
                }
            }, 1300);
        } catch (err) {
            setTimeout(() => {
                this.saveMatchData()
              }, 15000)
        }

    };

    getChampion = async (championId) => {
        const tier = [
            'CHALLENGER',
            'GRANDMASTER',
            'MASTER',
            'DIAMOND',
            'PLATINUM',
            'GOLD',
            'SILVER',
            'BRONZE',
        ];

        const itemList = [
            3001, 3006, 3009, 3011, 3020, 3026, 3031, 3033, 3036, 3040, 3042,
            3046, 3047, 3050, 3053, 3065, 3071, 3072, 3074, 3075, 3078, 3083,
            3085, 3089, 3091, 3094, 3095, 3100, 3102, 3107, 3109, 3110, 3111,
            3115, 3116, 3117, 3119, 3121, 3124, 3135, 3139, 3142, 3143, 3152,
            3153, 3156, 3157, 3158, 3165, 3179, 3181, 3190, 3193, 3222, 3504,
            3508, 3742, 3743, 3814, 3853, 3857, 3860, 3864, 4005, 4401, 4628,
            4629, 4633, 4636, 4637, 4638, 4643, 4644, 4645, 6035, 6333, 6609,
            6616, 6630, 6631, 6632, 6653, 6655, 6656, 6662, 6664, 6671, 6672,
            6673, 6675, 6676, 6691, 6692, 6693, 6694, 6695, 6696, 8001, 8020,
        ];

        let winRateByItemtoArray = [];
        
        // for (let j = 0; j < tier.length; j++) {
            const champion = await this.matchesRepository.getChampionById(
                championId, tier[0]
            );

            return champion;

        //     if (!champion) {
        //         throw new Error('해당 챔피언이 존재하지 않습니다');
        //     } else {
        //         const chapionOfItem = champion.map((champ) => {
        //             const item = [];

        //             item.push(
        //                 champ.item0,
        //                 champ.item1,
        //                 champ.item2,
        //                 champ.item3,
        //                 champ.item4,
        //                 champ.item5,
        //                 champ.win
        //             );

        //             return item;
        //         });

        //         for (let i = 0; i < itemList.length; i++) {
        //             let winCount = 0;
        //             let pickCount = 0;

        //             chapionOfItem.map((data) => {
        //                 if (data.indexOf(itemList[i]) === -1) {
        //                     return;
        //                 } else if (data.indexOf(true) === -1) {
        //                     pickCount = pickCount + 1;

        //                     return;
        //                 } else {
        //                     pickCount = pickCount + 1;
        //                     winCount = winCount + 1;
        //                 }
        //             });

        //             const winRateByItem = {
        //                 tier: tier[j],
        //                 item: itemList[i],
        //                 total: chapionOfItem.length,
        //                 pick: (
        //                     (pickCount / chapionOfItem.length) *
        //                     100
        //                 ).toFixed(2),
        //                 win: ((winCount / pickCount) * 100).toFixed(2),
        //             };

        //             if (winRateByItem.win !== 'NaN' && winRateByItem.pick > 2) {
        //                 winRateByItemtoArray.push(winRateByItem);
        //             }
        //         }

        //         winRateByItemtoArray.sort((a, b) => b.pick - a.pick);
        //     }
        // }
        // return winRateByItemtoArray;
    };

    // getWinRatingByChamp = async (championId) => {
    //     const champion = await this.matchesRepository.getChampionByIdtest(
    //         championId
    //     );

    //     if (!champion) {
    //         throw new Error('해당 챔피언이 존재하지 않습니다');
    //     } else {
    //         let matchData = [];

    //         champion.map((data) => {
    //             matchData.push({
    //                 matchId: data.matchId,
    //                 individualPosition: data.individualPosition,
    //             });
    //         });

    //         // console.log(matchData)

    //         const enemy = await this.matchesRepository.getEnemyById(
    //             championId,
    //             matchData
    //         );
    //     }
    // };
}

module.exports = MatchesService;
