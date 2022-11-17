require('dotenv').config();
const axios = require('axios');
const krUrl = 'https://kr.api.riotgames.com/lol/';
const asiaUrl = 'https://asia.api.riotgames.com/lol/';
const MatchesRepository = require('../repositories/Matches.repository');

class MatchesService {
    matchesRepository = new MatchesRepository();

    // getUserPuuId = async () => {

    //     const userPuuid = await this.matchesRepository.getUserPuuid();

    //     const searchMatch = setInterval( async () => {

    //         let i = 0;

    //         if ( i === userPuuid.length) {
                
    //             clearInterval(searchMatch);
    //             console.log('매치데이터 저장 종료')
    //         } else {
    //             console.log(`${i+1}번 유저 매치데이터 저장시작`)
    //             try {
    //                 await this.getMatchData(userPuuid[i])
    //             } catch (error) {
    //                 throw new Error(error.message)
    //             }

    //             i++ ;
    //         }
    //     }, 20000)   
    // }

    getLeagueData = async () => {
        //유저 puuid 추출
        console.log('저장시작');
        const legueData = await axios({
            method: 'get',
            url: `${krUrl}league/v4/grandmasterleagues/by-queue/RANKED_SOLO_5x5`,
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
                'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                'Accept-Charset':
                    'application/x-www-form-urlencoded; charset=UTF-8',
                Origin: 'https://developer.riotgames.com',
                'X-Riot-Token': process.env.API_KEY,
            },
            responseType: 'json',
        })
            .then((response) => {
                return response.data.entries;
            })
            .catch((error) => {
                return error.message;
            });

        const legueDataOfId = await legueData.map((data) => {
            return data.summonerId;
        });

        let i = 228;

        const getPuuId = setInterval(async () => {
            if (i === legueDataOfId.length) {
                clearInterval(getPuuId);
            } else {
                const userPuuid = await axios({
                    method: 'get',
                    url: `${krUrl}summoner/v4/summoners/${legueDataOfId[i]}`,
                    headers: {
                        'User-Agent':
                            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
                        'Accept-Language':
                            'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                        'Accept-Charset':
                            'application/x-www-form-urlencoded; charset=UTF-8',
                        Origin: 'https://developer.riotgames.com',
                        'X-Riot-Token': process.env.API_KEY,
                    },
                    responseType: 'json',
                })
                    .then((response) => {
                        return response.data.puuid;
                    })
                    .catch((error) => {
                        return error.message;
                    });

                console.log(`${i + 1}번 유저`, userPuuid);
                this.getMatchData(userPuuid);

                i++;
            }
        }, 240000);
    };

    getMatchData = async (userPuuid) => {
        console.log('매치데이터 가져오기시작');
        const userMatchid = await axios({
            method: 'get',
            url: `${asiaUrl}match/v5/matches/by-puuid/${userPuuid}/ids`,
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
                'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                'Accept-Charset':
                    'application/x-www-form-urlencoded; charset=UTF-8',
                Origin: 'https://developer.riotgames.com',
                'X-Riot-Token': process.env.API_KEY,
            },
            params: {
                queue: 420,
                start: 0,
                count: 80,
            },
        })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.message;
            });

        console.log(userMatchid);
        this.saveMatchData(userMatchid);
    };

    saveMatchData = async (userMatchid) => {
        let i = 0;

        const saveMatchInterval = setInterval(async () => {
            if (i === userMatchid.length) {
                clearInterval(saveMatchInterval);
            } else {
                const userMatchData = await axios({
                    method: 'get',
                    url: `${asiaUrl}match/v5/matches/${userMatchid[i]}`,
                    headers: {
                        'User-Agent':
                            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
                        'Accept-Language':
                            'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                        'Accept-Charset':
                            'application/x-www-form-urlencoded; charset=UTF-8',
                        Origin: 'https://developer.riotgames.com',
                        'X-Riot-Token': process.env.API_KEY,
                    },
                    responseType: 'json',
                })
                    .then((response) => {
                        return response.data;
                    })
                    .catch((error) => {
                        return error.message;
                    });

                console.log(
                    `${i + 1}번째 매치데이터아이디`,
                    userMatchData.metadata.matchId
                );

                const matchid = userMatchData.metadata.matchId;
                const findMatchId = await this.matchesRepository.findMatchById(
                    matchid
                );

                if (!findMatchId) {
                    await this.matchesRepository.saveMatchData(userMatchData);
                } else {
                    console.log(`${i + 1}번쨰와 동일한 매치데이터 존재함`);
                }

                i++;
            }
        }, 1000);
    };
    
    getChampion = async (championId) => {

        const tier = ['challenger', 'grandmaster', 'master', 'diamond', 'platinum', 'gold', 'silver', 'bronze']

        const itemList = [
            3001, 3006, 3009, 3011, 3020, 3026, 3031, 3033, 3036, 3040,
            3042, 3046, 3047, 3050, 3053, 3065, 3071, 3072, 3074,
            3075, 3078, 3083, 3085, 3089, 3091, 3094, 3095, 3100, 3102,
            3107, 3109, 3110, 3111, 3115, 3116, 3117, 3119, 3121, 3124,
            3135, 3139, 3142, 3143, 3152, 3153, 3156, 3157, 3158, 3165,
            3179, 3181, 3190, 3193, 3222, 3504, 3508, 3742, 3743, 3814,
            3853, 3857, 3860, 3864, 4005, 4401, 4628, 4629, 4633, 4636,
            4637, 4638, 4643, 4644, 4645, 6035, 6333, 6609, 6616, 6630,
            6631, 6632, 6653, 6655, 6656, 6662, 6664, 6671, 6672, 6673,
            6675, 6676, 6691, 6692, 6693, 6694, 6695, 6696, 8001, 8020,
        ];

        let winRateByItemtoArray = [];

        for (let j = 0; j < tier.length; j++) {
            
            const champion = await this.matchesRepository.getChampionById(
                championId, tier[j]
            );
    
            if (!champion) {
                throw new Error('해당 챔피언이 존재하지 않습니다');
            } else {
                const chapionOfItem = champion.map((champ) => {
                    const item = [];
    
                    item.push(
                        champ.item0,
                        champ.item1,
                        champ.item2,
                        champ.item3,
                        champ.item4,
                        champ.item5,
                        champ.win
                    );
    
                    return item;
                });

                for (let i = 0; i < itemList.length; i++) {
                    let winCount = 0;
                    let pickCount = 0;
    
                    chapionOfItem.map((data) => {
                        if (data.indexOf(itemList[i]) === -1) {
                            return;
                        } else if (data.indexOf(true) === -1) {
                            pickCount = pickCount + 1;
    
                            return;
                        } else {
                            pickCount = pickCount + 1;
                            winCount = winCount + 1;
                        }
                    });
    
                    const winRateByItem = {
                        tier: tier[j],
                        item: itemList[i],
                        total: chapionOfItem.length,
                        pick: ((pickCount / chapionOfItem.length) * 100).toFixed(2),
                        win: ((winCount / pickCount) * 100).toFixed(2),
                    };
    
                    if (winRateByItem.win !== 'NaN' && winRateByItem.pick > 2) {
                        winRateByItemtoArray.push(winRateByItem);
                    }
                }
                
                winRateByItemtoArray.sort((a, b) => b.pick - a.pick);
            }
        }
        return winRateByItemtoArray;
    }

    getWinRatingByChamp = async (championId) => {
        const champion = await this.matchesRepository.getChampionByIdtest(championId);

        if (!champion) {

            throw new Error('해당 챔피언이 존재하지 않습니다');

        } else {
            let matchData = [];

            champion.map((data) => {
                
                matchData.push({
                    matchId: data.matchId,
                    individualPosition: data.individualPosition
                })
                
            })

            // console.log(matchData)

            const enemy = await this.matchesRepository.getEnemyById(championId, matchData)

        }
    }
        
}

module.exports = MatchesService;
