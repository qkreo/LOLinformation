require('dotenv').config();

const MatchesRepository = require('../repositories/Matches.repository');
const championData = require('../dataInfo/champId.js')

const API = require('../apiList');

class MatchesService {
    constructor() {
        this.matchesRepository = new MatchesRepository();
        this.api = new API();
    }

    getLeagueList = async (league) => {
        // 챌 ,그마 ,마스터용

        const tierList = await this.api.getLeagueList(league);

        this.getSummoner(tierList);
    };

    gettierList = async (division, tier, page) => {
        try {
            const saveMatchInterval = setInterval(async () => {
                if (page === 10) {
                    console.log('=============저장종료=============');
                    clearInterval(saveMatchInterval);
                } else {
                    const tierList = await this.api.gettierList(
                        division,
                        tier,
                        page
                    );

                    this.getSummoner(tierList);

                    page = page + 2;
                }
            }, 180000);
        } catch (err) {
            setTimeout(() => {
                this.gettierList(division, tier, page);
            }, 180000);
        }
    };

    getSummoner = async (tierList) => {
        try {
            let i = 0;
            console.log(tierList.entries.length);
            const saveMatchInterval = setInterval(async () => {
                if (i === tierList.entries.length) {
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
                this.getSummoner(tierList);
            }, 15000);
        }
    };

    getMatchList = async (summoner) => {
        try {
            const matchList = await this.api.getMatchList(summoner);

            matchList.map(async (match) => {
                const findMatch = await this.matchesRepository.findMatchList(
                    match.matchId
                );
                if (!findMatch) this.matchesRepository.saveMatchList(match);
                else console.log('중복');
            });
        } catch (err) {
            setTimeout(() => {
                this.getLeagueList();
            }, 20000);
        }
    };

    saveMatchData = async (tier) => {
        try {
            let i = 16492;
            const matchList = await this.matchesRepository.findMatch(tier);
            console.log(matchList.length, '매치리스트');
            const saveMatchInterval = setInterval(async () => {
                if (i === matchList.length) {
                    console.log('=============매치저장종료=============');
                    clearInterval(saveMatchInterval);
                } else {
                    const findMatchId =
                        await this.matchesRepository.findMatchById(
                            matchList[i].matchId
                        );
                    if (!findMatchId) {
                        console.log(`${i}번째 매치데이터 저장`);
                        const matchData = await this.api.findMatchData(
                            matchList[i].matchId,
                            i
                        ); 
                        if(typeof matchData === "object") {
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
                        } else {
                            console.log("이거 의미있나111")
                            return
                        }
                      
                    } else console.log(`${i}번쨰와 동일한 매치데이터 존재함`);

                    i++;
                }
            }, 1500);
        } catch (err) {
            console.log("이거 의미있나222")
        }
    };

    saveRating = async () => {
        
        const tierList = [
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
            '3001', '3006', '3009', '3011', '3020', '3026', '3031', '3033', '3036', '3040', '3042',
            '3046', '3047', '3050', '3053', '3065', '3071', '3072', '3074', '3075', '3078', '3083',
            '3085', '3089', '3091', '3094', '3095', '3100', '3102', '3107', '3109', '3110', '3111',
            '3115', '3116', '3117', '3119', '3121', '3124', '3135', '3139', '3142', '3143', '3152',
            '3153', '3156', '3157', '3158', '3165', '3179', '3181', '3190', '3193', '3222', '3504',
            '3508', '3742', '3743', '3814', '3853', '3857', '3860', '3864', '4005', '4401', '4628',
            '4629', '4633', '4636', '4637', '4638', '4643', '4644', '4645', '6035', '6333', '6609',
            '6616', '6630', '6631', '6632', '6653', '6655', '6656', '6662', '6664', '6671', '6672',
            '6673', '6675', '6676', '6691', '6692', '6693', '6694', '6695', '6696', '8001', '8020',
        ];


        // const tierData = await Promise.all(tierList.map(async (tier) => {

        //     return (await this.matchesRepository.getMatchByTier(
        //         tier
        //     ));
            
        // }))

        // console.log(tierData)

        // tierData.forEach((match) => {
            
        // })
        
        
        let i = 0;
        // championData.map(async (champ) => {
        //     console.log(`${champ.id}번 챔피언 승률계산중`)

        //     await Promise.all(tierList.map(async (tier) => {
                
        //         const champion = await this.matchesRepository.getChampionById(
        //             champ.id, tier
        //         );
                        
        //         await Promise.all(itemList.map(async (item) => {
        //             let winCount = 0;
        //             let pickCount = 0;
    
        //             const chapionOfItem = await Promise.all(champion.map((champ) => {
        
        //                 let result = champ.dataValues.MatchData[0].dataValues.itemList.split(',')
        
        //                 result.push(champ.dataValues.MatchData[0].dataValues.win)
            
        //                 return result;
        //             }));
                            
        //             await Promise.all(chapionOfItem.map((data) => {
                                
        //                 if (data.indexOf(item) === -1) {
        //                     return;
        //                 } else if (data[6] === '0') {
        //                     pickCount = pickCount + 1;
        //                     return;
        //                 } else {
        //                     pickCount = pickCount + 1;
        //                     winCount = winCount + 1;
        //                 }
        //             }));
                        
        //                 const winRateByItem = {
        //                     championId: champ.id,
        //                     tier: tier,
        //                     itemId: item,
        //                     totalMatch: chapionOfItem.length,
        //                     pickRate: ((pickCount / chapionOfItem.length) *100).toFixed(2),
        //                     winRate: ((winCount / pickCount) * 100).toFixed(2),
        //                 };
                            
        //                 if (winRateByItem.winRate !== 'NaN' && winRateByItem.pickRate > 2) {
        //                     await this.matchesRepository.saveRating(winRateByItem);
        //                 }
        //             }))
        //         }))
        // })
        
        const RatingInterval = setInterval( async () => {
            
            if(i === championData.length) {
                clearInterval(RatingInterval);
                console.log(`승률 데이터 저장 완료`)
            } else {
                
                console.log(`${championData[i].engName} 승률계산중`)
                
                await Promise.all(tierList.map(async (tier) => {
                    
                    const champion = await this.matchesRepository.getChampionById(
                        championData[i].id, tier
                    );
                        
                    itemList.map(async (item) => {
                        let winCount = 0;
                        let pickCount = 0;
    
                        const chapionOfItem = champion.map((champ) => {
        
                            let result = champ.dataValues.MatchData[0].dataValues.itemList.split(',')
            
                            result.push(champ.dataValues.MatchData[0].dataValues.win)
            
                            return result;
                        });
                            
                        chapionOfItem.map((data) => {
                                
                            if (data.indexOf(item) === -1) {
                                return;
                            } else if (data[6] === '0') {
                                pickCount = pickCount + 1;
                                return;
                            } else {
                                pickCount = pickCount + 1;
                                winCount = winCount + 1;
                            }
                        });
                            
                            const winRateByItem = {
                                championId: championData[i].id,
                                tier: tier,
                                itemId: item,
                                totalMatch: chapionOfItem.length,
                                pickRate: (
                                    (pickCount / chapionOfItem.length) *
                                    100
                                ).toFixed(2),
                                winRate: ((winCount / pickCount) * 100).toFixed(2),
                            };
                            
                            if (winRateByItem.winRate !== 'NaN' && winRateByItem.pickRate > 2) {
                                await this.matchesRepository.saveRating(winRateByItem)
                            }
                        })
                    
                }))
                i++;
            }
            
           
        }, 60000)
        
        
    };

    getChampion = async (championId) => {
        const champion = await this.matchesRepository.getChampion(championId)

        return champion;
    }

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
