require('dotenv').config();
const axios = require('axios');
const leagueUrl = 'https://kr.api.riotgames.com/lol/league/v4/'
const asiaUrl = 'https://asia.api.riotgames.com/lol/';

const headers = {
    'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
    Origin: 'https://developer.riotgames.com',
    'X-Riot-Token': process.env.APIKEY
};

class API {
    getLeagueList = async (leagueTier) => {
        console.log(leagueTier,"API호출")
        const summonerList = await axios({
            method: 'get',
            url: `${leagueUrl}${leagueTier}leagues/by-queue/RANKED_SOLO_5x5`,
            headers: headers,
        })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error.message);
            });

        return summonerList;
    };

    getTierList = async (division, tier, page) => {
        console.log(tier + "티어" + page + "페이지 API호출")
        const tierList = await axios({
            method: 'get',
            url: `${leagueUrl}entries/RANKED_SOLO_5x5/${tier}/${division}?page=${page}`,
            headers: headers,
        })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error.message);
            });
        console.log(`${page}페이지의 소환사리스트`);
      const result = {};  
        result.entries = tierList;
        result.tier = tierList[0].tier;
        return result;
    };


    getSummoner = async (tierList, i) => {

        if(tierList.entries.length < i ) i = 0

        const summoner = await axios({
            method: 'get',
            url: `https://kr.api.riotgames.com/lol/summoner/v4/summoners/${tierList.entries[i].summonerId}`,
            headers: headers,
        })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return console.log(error.message);
            });
            if (typeof summoner === 'object') {
                summoner.tier = tierList.tier;               
                // summoner.rank = tierList.entries[i].rank
                // summoner.leaguePoints = tierList.entries[i].leaguePoints
                // summoner.wins = tierList.entries[i].wins
                // summoner.losses = tierList.entries[i].losses
                return summoner;
            }
            else {
                return summoner;
            }    
    
    };

    getSummonerAccount = async (summonerName) => {
        const summonerAccount = await axios({
            method: 'get',
            url: `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
            headers: headers,
        })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error.message);
                return error.message
            });
        console.log(summonerAccount)
        const [summonertier] = await axios({
            method: 'get',
            url: `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerAccount.id}`,
            headers: headers,
        })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error.message);
                return error.message
            });
            if(summonertier === undefined) {
                return "랭크게임 전적이 없습니다"
            } else {
                summonerAccount.tier = summonertier.tier
                return summonerAccount;
            }

    };

    getMatchList = async (summoner) => {
        const matchList = await axios({
            method: 'get',
            url: `${asiaUrl}match/v5/matches/by-puuid/${summoner.puuid}/ids`,
            headers: headers,
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
                console.log(error.message);
                return 
            });
            if (typeof matchList === 'object') {
                const match = matchList.map((data) => {
                    return {
                        matchId: data,
                        tier: summoner.tier,
                    };
                });
                return match;
            }
            else {
                return
            }
    };

    findMatchData = async (match) => {

        const matchData = await axios({
            method: 'get',
            url: `${asiaUrl}match/v5/matches/${match.matchId}`,
            headers: headers,
            responseType: 'json',
        })
            .then((response) => {
                return response.data; 
            })
            .catch((error) => {
                return error.message;
            });
            if (typeof matchData === 'object') {
                matchData.tier = match.tier
                return matchData
            }
            else {
                return matchData
            }    
    };
}

module.exports = API;
