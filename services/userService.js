const axios = require('axios');
const APIKEY = 'RGAPI-c03e6750-2775-4f78-87f2-c42eee95f086';
const reqHeader = {
    'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
    Origin: 'https://developer.riotgames.com',
    'X-Riot-Token': APIKEY,
};

const UserRepository = require('../repositories/userRepository');

class UserService {
    userRepository = new UserRepository();

    findSummoner = async (summonerId) => {
        const APIUrl = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}`;
        const response = await axios({
            method: 'get', // [요청 타입]
            url: APIUrl, // [요청 주소]
            headers: reqHeader,
            responseType: 'json',
        })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log('ERROR : ' + JSON.stringify(error));
            });
        return response;
    };

    findChallengers = async () => {
        const APIUrl =
            'https://kr.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5'; // 솔랭 챌린저
        const challengerlist = await axios({
            method: 'get', // [요청 타입]
            url: APIUrl, // [요청 주소]
            headers: reqHeader,
            responseType: 'json',
        })
            .then(function (response) {
                return response.data.entries;
            })
            .catch(function (error) {
                console.log('ERROR : ' + JSON.stringify(error));
            });

        for (let i = 0; i < challengerlist.length; i++) {
            const result = await this.userRepository.findSummoner(
                challengerlist[i].summonerId
            );
            if (!result) {
                setTimeout(async () => {
                    const summonerAccount = await this.findSummoner(
                        challengerlist[i].summonerId
                    );
                    const summonerData = {
                        _id: summonerAccount.id,
                        accountId: summonerAccount.accountId,
                        puuid: summonerAccount.puuid,
                        tier: 'challenger',
                        name: summonerAccount.name,
                        profileIconId: summonerAccount.profileIconId,
                        revisionDate: summonerAccount.revisionDate,
                        summonerLevel: summonerAccount.summonerLevel,
                    };
                    await this.userRepository.saveSummoner(summonerData);
                    console.log(i, 'saving');
                }, i * 700);
            } else {
                console.log('alreadySaved');
            }
        }
    };

    findGrandmasters = async () => {
        const APIUrl =
            'https://kr.api.riotgames.com/lol/league/v4/grandmasterleagues/by-queue/RANKED_SOLO_5x5'; // 솔랭 챌린저
        const grandmasterlist = await axios({
            method: 'get', // [요청 타입]
            url: APIUrl, // [요청 주소]
            headers: reqHeader,
            responseType: 'json',
        })
            .then(function (response) {
                return response.data.entries;
            })
            .catch(function (error) {
                console.log('ERROR : ' + JSON.stringify(error));
            });

        for (let i = 0; i < grandmasterlist.length; i++) {
            const result = await this.userRepository.findSummoner(
                grandmasterlist[i].summonerId
            );
            if (!result) {
                setTimeout(async () => {
                    const summonerAccount = await this.findSummoner(
                        grandmasterlist[i].summonerId
                    );
                    const summonerData = {
                        _id: summonerAccount.id,
                        accountId: summonerAccount.accountId,
                        puuid: summonerAccount.puuid,
                        tier: 'grandmaster',
                        name: summonerAccount.name,
                        profileIconId: summonerAccount.profileIconId,
                        revisionDate: summonerAccount.revisionDate,
                        summonerLevel: summonerAccount.summonerLevel,
                    };
                    console.log(i, 'saving');
                    await this.userRepository.saveSummoner(summonerData);
                }, i * 1100);
            } else {
                console.log('alreadySaved');
            }
        }
    };

    findMasters = async () => {
        const APIUrl =
            'https://kr.api.riotgames.com/lol/league/v4/masterleagues/by-queue/RANKED_SOLO_5x5'; // 솔랭 챌린저
        const masterlist = await axios({
            method: 'get', // [요청 타입]
            url: APIUrl, // [요청 주소]
            headers: reqHeader,
            responseType: 'json',
        })
            .then(function (response) {
                return response.data.entries;
            })
            .catch(function (error) {
                console.log('ERROR : ' + JSON.stringify(error));
            });
        console.log(masterlist.length);
        for (let i = 0; i < 500; i++) {
            const result = await this.userRepository.findSummoner(
                masterlist[i].summonerId
            );
            setTimeout(async () => {
                if (!result) {
                    const summonerAccount = await this.findSummoner(
                        masterlist[i].summonerId
                    );
                    const summonerData = {
                        _id: summonerAccount.id,
                        accountId: summonerAccount.accountId,
                        puuid: summonerAccount.puuid,
                        tier: 'gold',
                        name: summonerAccount.name,
                        profileIconId: summonerAccount.profileIconId,
                        revisionDate: summonerAccount.revisionDate,
                        summonerLevel: summonerAccount.summonerLevel,
                    };
                    console.log(i, 'saving');
                    await this.userRepository.saveSummoner(summonerData);
                } else {
                    console.log('alreadySaved');
                }
            }, i * 1500);
        }
        return 'saveEnd';
    };

    findTiers = async (Tier, Page) => {
        const APIUrl = 'https://kr.api.riotgames.com/lol/league/v4/entries/';
        const reqQuery = `?page=${Page}`;
        const reqParams = `RANKED_SOLO_5x5/${Tier}/I`;

        const tierlist = await axios({
            method: 'get', // [요청 타입]
            url: APIUrl + reqParams + reqQuery, // [요청 주소]
            headers: reqHeader,
            responseType: 'json',
        })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log('ERROR : ' + JSON.stringify(error));
            });
        console.log(tierlist.length);
        for (let i = 0; i < tierlist.length; i++) {
            const result = await this.userRepository.findSummoner(
                tierlist[i].summonerId
            );
            setTimeout(async () => {
                if (!result) {
                    const summonerAccount = await this.findSummoner(
                        tierlist[i].summonerId
                    );
                    const summonerData = {
                        _id: summonerAccount.id,
                        accountId: summonerAccount.accountId,
                        puuid: summonerAccount.puuid,
                        tier: Tier,
                        name: summonerAccount.name,
                        profileIconId: summonerAccount.profileIconId,
                        revisionDate: summonerAccount.revisionDate,
                        summonerLevel: summonerAccount.summonerLevel,
                    };
                    console.log(i, 'saving');
                    await this.userRepository.saveSummoner(summonerData);
                } else {
                    console.log('alreadySaved');
                }
            }, i * 1500);
        }
        return 'saveEnd';
    };
}

module.exports = UserService;
