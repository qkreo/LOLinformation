require('dotenv').config();

const MatchesRepository = require('../repositories/Matches.repository');

const championData = require('../dataInfo/champId.js');
const coreItemList = require('../dataInfo/item.js')

const API = require('../apiList');

class MatchesService {
    constructor() {
        this.matchesRepository = new MatchesRepository();
        this.api = new API();
    }

    getLeagueList = async (leagueTier) => {
        if (leagueTier === undefined) leagueTier = 'challenger';
        console.log('챌~마스터 티어 수집 시작');

        const leagueSummonerList = await this.api.getLeagueList(leagueTier);

        this.getSummoner(leagueSummonerList);
    };

    getTierList = async (division, tier, page) => {
        console.log(tier, '데이터수집 시작');

        if (page === 6) {
            console.log(`=============${tier}List저장종료=============`);

            switch (tier) {
                case 'DIAMOND':
                    this.getTierList('I', 'PLATINUM', '0');
                    break;
                case 'PLATINUM':
                    this.getTierList('I', 'GOLD', '0');
                    break;
                case 'GOLD':
                    this.getTierList('I', 'SILVER', '0');
                    break;
                case 'SILVER':
                    this.getTierList('I', 'BRONZE', '0');
                    break;
                default:
                    console.log('============getTierList=========');
                    this.saveMatchData('challenger');
                    break;
            }
        } else {
            const leagueSummonerList = await this.api.getTierList(
                division,
                tier,
                page
            );

            this.getSummoner(leagueSummonerList, page);
        }
    };

    getSummoner = async (leagueSummonerList, page) => {
        let i = 0;
        console.log(leagueSummonerList.entries.length);
        if (leagueSummonerList.tier === Master)
            leagueSummonerList.entries.length = 1000;
        console.log(leagueSummonerList.entries.length);
        const saveMatchInterval = setInterval(async () => {
            if (i === leagueSummonerList.entries.length) {
                console.log('=============저장종료=============');
                clearInterval(saveMatchInterval);
                switch (leagueSummonerList.tier) {
                    case 'CHALLENGER':
                        this.getLeagueList('grandmaster');
                        break;
                    case 'GRANDMASTER':
                        this.getLeagueList('master');
                        break;
                    case 'MASTER':
                        this.getTierList('I', 'DIAMOND', '0');
                        break;
                    case 'DIAMOND':
                        page = page + 2;
                        this.getTierList('I', 'DIAMOND', page);
                        break;
                    case 'PLATINUM':
                        page = page + 2;
                        this.getTierList('I', 'PLATINUM', page);
                        break;
                    case 'GOLD':
                        page = page + 2;
                        this.getTierList('I', 'GOLD', page);
                        break;
                    case 'SILVER':
                        page = page + 2;
                        this.getTierList('I', 'SILVER', page);
                        break;
                    case 'BRONZE':
                        page = page + 2;
                        this.getTierList('I', 'BRONZE', page);
                        break;
                    // default : this.saveMatchData('challenger');
                    // break;
                }
            } else {
                const summoner = await this.api.getSummoner(
                    leagueSummonerList,
                    i
                );
                if (typeof summoner === 'object') this.getMatchList(summoner);
                else return console.log('API 호출실패로 대기');

                i++;
            }
        }, 1300);
    };

    getMatchList = async (summoner) => {
        const matchList = await this.api.getMatchList(summoner);

        if (typeof matchList === 'object') {
            matchList.map(async (match) => {
                const findMatch = await this.matchesRepository.findMatchList(
                    match.matchId
                );
                if (!findMatch) this.matchesRepository.saveMatchList(match);
                else console.log(`이미 저장된 매치 ${match.matchId} 입니다`);
            });
        } else {
            return console.log('API 호출실패로 대기');
        }
    };

    saveMatchData = async (tier) => {
        if (tier === undefined) tier = 'CHALLENGER';
        let i = 0;
        const matchList = await this.matchesRepository.findMatch(tier);
        console.log(matchList.length, '매치리스트');

        const saveMatchInterval = setInterval(async () => {
            if (i === matchList.length) {
                console.log('=============매치저장종료=============');
                clearInterval(saveMatchInterval);

                switch (tier) {
                    case 'CHALLENGER':
                        this.saveMatchData('GRANDMASTER');
                        break;
                    case 'GRANDMASTER':
                        this.saveMatchData('MASTER');
                        break;
                    default:
                        console.log('매치 저장 종료 ');
                }
            } else {
                const findMatchId = await this.matchesRepository.findMatchById(
                    matchList[i].matchId
                );
                if (!findMatchId) {
                    console.log(`${tier}티어${i}번째 매치데이터 저장`);
                    const matchData = await this.api.findMatchData(
                        matchList[i],
                        i
                    );
                    switch (matchData) {
                        case 'Request failed with status code 404':
                            await this.matchesRepository.deleteMatchList(
                                matchList[i].matchId
                            );
                            console.log('Data not found');
                            break;
                        case 'Request failed with status code 429':
                            console.log('Rate limit exceeded');
                            return;
                        case 'Request failed with status code 500':
                            console.log('Internal server error');
                            return;
                        case 'connect ETIMEDOUT 103.240.225.13:443':
                            console.log('API 호출실패로 대기');
                            return;
                        case 'Request failed with status code 503':
                            console.log('Service unavailable');
                            return;
                        default:
                            matchData.info.participants.map((data) => {
                                const itemList = [
                                    data.item0,
                                    data.item1,
                                    data.item2,
                                    data.item3,
                                    data.item4,
                                    data.item5,
                                ];
                                const result = itemList.filter((data) => {
                                    return data !== 0;
                                });
                                const textItemList = result.join();

                                const unixDate = `${matchData.info.gameStartTimestamp}`;
                                const realDate = unixDate.substring(0, 10);
                                const matchDate = new Date(realDate * 1000);

                                this.matchesRepository.saveMatchData({
                                    matchId: matchData.metadata.matchId,
                                    matchTier: matchData.tier,
                                    matchDate: matchDate,
                                    championId: data.championId,
                                    championName: data.championName,
                                    championTransform: data.championTransform,
                                    itemList: textItemList,
                                    summoner1Id: data.summoner1Id,
                                    summoner2Id: data.summoner2Id,
                                    summonerName: data.summonerName,
                                    teamPosition: data.teamPosition,
                                    win: data.win,
                                });
                            });
                            break;
                    }
                } else {
                    return;
                    // console.log(
                    //     `${tier}티어 ${i}번쨰와 동일한 매치데이터 존재함`
                    // );
                    // console.log(`${tier} 매치데이터 업데이트를 완료하였습니다`);
                    // clearInterval(saveMatchInterval);

                    // switch (tier) {
                    //     case 'CHALLENGER':
                    //         this.saveMatchData('GRANDMASTER');
                    //         break;
                    //     case 'GRANDMASTER':
                    //         this.saveMatchData('MASTER');
                    //         break;
                    //     default:
                    //         console.log('매치 저장 종료 ');
                    // }
                }
                i++;
            }
        }, 1200);
    };

    getEnemyById = async (myChampionId, enemyChampionId) => {
        const rate = await this.matchesRepository.getEnemyById(
            myChampionId,
            enemyChampionId
        );
        return rate;
    };

    saveRating = () => {
        let i = 0;
        const ratingInterval = setInterval( async ()=>{
            if(i === championData.length) {
                console.log('챔피언 승률 저장 종료')
                clearInterval(ratingInterval);

            } else {

                const matchDataList = await this.matchesRepository.getChampionById(
                    championData[i].id
                );
                
                let challenger = [];
                let grandmaster = [];
                let master = [];
                let diamond = [];
                let platinum = [];
                let gold = [];
                let silver = [];
                let bronze = [];
    
                matchDataList.forEach((matchData) => {
                    const championItem = matchData.itemList.split(',');
    
                    matchData.itemList = championItem; 
    
                    switch (matchData.matchTier) {
                        case 'CHALLENGER':
                            challenger.push(matchData)
                            break;
                        case 'GRANDMASTER':
                            grandmaster.push(matchData);
                            break;
                
                        case 'MASTER':
                            master.push(matchData);
                            break;
                
                        case 'DIAMOND':
                            diamond.push(matchData);
                            break;
                
                        case 'PLATINUM':
                            platinum.push(matchData);
                            break;
                
                        case 'GOLD':
                            gold.push(matchData);
                            break;
                
                        case 'SILVER':
                            silver.push(matchData);
                            break;
                
                        case 'BRONZE':
                            bronze.push(matchData);
                            break;
                    }
                });
    
                const tierList = [challenger, grandmaster, master, diamond, platinum, gold, silver, bronze]
    
                const rateByitemResult = await this.ratingByitem(tierList)
    
                await rateByitemResult.map((data) => {
                    this.matchesRepository.saveRating(data)
                })

                i++;
            }}, 60000)
        };
    
        ratingByitem = async (tierList) => {
            const rateResult = tierList.map((tier) => {
                const calculateResult = coreItemList.map((item) => {
                    let pickCount = 0;
                    let winCount = 0;
                    tier.forEach((data) => {
                        if(data.itemList.indexOf(item) === -1) {
                        } else if (data.win === '0') { pickCount++;}
                        else {pickCount++; winCount++;}
                    })
        
                    return {
                        championId: tier[0].championId,
                        tier: tier[0].matchTier,
                        itemId: item,
                        totalMatch: tier.length,
                        pickRate: ((pickCount/tier.length)*100).toFixed(2),
                        winRate: ((winCount/pickCount)*100).toFixed(2)
                    }
                });
    
                return calculateResult
            })
    
            return rateResult
    }

    getChampion = async (championId) => {
        const champion = await this.matchesRepository.getChampion(championId);

        return champion;
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
