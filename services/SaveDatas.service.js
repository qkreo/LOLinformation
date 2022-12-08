const SaveDataRepository = require('../repositories/SaveData.repository');

const championData = require('../dataInfo/champId.js');
const coreItemList = require('../dataInfo/item.js');

const API = require('../apiList');

class SaveDataService {
    constructor() {
        this.saveDataRepository = new SaveDataRepository();
        this.api = new API();
    }

    getLeagueList = async (leagueTier) => {
        if (leagueTier === undefined) leagueTier = 'challenger';
        console.log(leagueTier, '티어 수집 시작');

        const leagueSummonerList = await this.api.getLeagueList(leagueTier);
        if (typeof leagueSummonerList === 'object') {
            this.getSummoner(leagueSummonerList);
        } else {
            console.log(leagueSummonerList);
            this.getLeagueList('challenger');
        }
        return '데이터 수집 시작';
    };

    getTierList = async (division, tier, page) => {
        console.log(tier + ' 티어', page + ' 페이지 데이터수집 시작');

        if (page >= 3) {
            console.log(`=============${tier}List저장종료=============`);

            switch (tier) {
                case 'DIAMOND':
                    this.getTierList('I', 'PLATINUM', '1');
                    break;
                case 'PLATINUM':
                    this.getTierList('I', 'GOLD', '1');
                    break;
                case 'GOLD':
                    this.getTierList('I', 'SILVER', '1');
                    break;
                case 'SILVER':
                    this.getTierList('I', 'BRONZE', '1');
                    break;
                default:
                    console.log('============매치데이터 저장 시작 =========');
                    this.saveMatchData('CHALLENGER');
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
        return '데이터 수집 시작';
    };

    getSummoner = async (leagueSummonerList, page) => {
        let i = 0;
        console.log(leagueSummonerList.entries.length, '명의 소환사');
        if (leagueSummonerList.tier === 'MASTER')
            leagueSummonerList.entries = leagueSummonerList.entries.slice(
                0,
                300
            ); // 7000명 너무많아서 일단 300명으로 제한

        const saveMatchInterval = setInterval(async () => {
            if (i >= leagueSummonerList.entries.length) {
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
                        this.getTierList('I', 'DIAMOND', '1');
                        break;
                    case 'DIAMOND':
                        // page = page + 2 실행시 문자열 + 2가 돼서 기대값은 1 + 2 = 3 이었지만 결과값은 12였음
                        page = Number(page) + 2;
                        this.getTierList('I', 'DIAMOND', page);
                        break;
                    case 'PLATINUM':
                        page = Number(page) + 2;
                        this.getTierList('I', 'PLATINUM', page);
                        break;
                    case 'GOLD':
                        page = Number(page) + 2;
                        this.getTierList('I', 'GOLD', page);
                        break;
                    case 'SILVER':
                        page = Number(page) + 2;
                        this.getTierList('I', 'SILVER', page);
                        break;
                    case 'BRONZE':
                        page = Number(page) + 2;
                        this.getTierList('I', 'BRONZE', page);
                        break;
                }
            } else {
                const summoner = await this.api.getSummoner(
                    leagueSummonerList,
                    i
                );
                if (typeof summoner === 'object') {
                    i++; // i++ 의 위치와 관계없이 간혹 i++가 되지않고 인터벌이 계속 같은 소환사를 호출함
                    this.getMatchList(summoner);
                    console.log(
                        `${leagueSummonerList.entries.length}명의 서머너 중 ${i}번째${leagueSummonerList.tier} ${summoner.name}`
                    );
                    return;
                } else {
                    return console.log('API 호출실패로 대기');
                }
            }
        }, 1300);
    };

    getAccount = async (summonerName) => {
        const summoner = await this.api.getSummonerAccount(summonerName);
        if (typeof summoner === 'object') {
            this.getAccountMatchList(summoner);
            return '첫 데이터수집은 시간이 소요됩니다';
        } else return summoner;
    };

    getAccountMatchList = async (summoner) => {
        const matchList = await this.api.getMatchList(summoner);
        if (typeof matchList === 'object') {
            for (let i = 0; i < matchList.length; i++) {
                const result = await this.saveDataRepository.saveMatchList(
                    matchList[i]
                );
                if (result === true) console.log(matchList[i], '저장완료');
            }
            this.saveSummonerMatchData(matchList);
            return;
        } else {
            return console.log('API 호출실패로 대기');
        }

    };

    saveSummonerMatchData = async (matchList) => {
        console.log("서머너 매치리스트",matchList.length);
        let i = 0;
        const saveMatchInterval = setInterval(async () => {
            if (i >= matchList.length) {
                console.log('=============매치저장종료=============');
                clearInterval(saveMatchInterval);
            } else {
                const findMatchId = await this.saveDataRepository.findMatchById(
                    matchList[i].matchId
                );
                if (findMatchId === null) {
                    const matchData = await this.api.findMatchData(
                        matchList[i]
                    );
                    switch (typeof matchData) {
                        case 'string':
                            console.log(matchData);
                            break;
                        default:
                            console.log(matchData.metadata.matchId, '저장');
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

                                const summonerName = data.summonerName
                                    .split(' ')
                                    .join('');

                                this.saveDataRepository.saveMatchData({
                                    matchId: matchData.metadata.matchId,
                                    matchTier: matchData.tier,
                                    matchDate: matchDate,
                                    championId: data.championId,
                                    championName: data.championName,
                                    championTransform: data.championTransform,
                                    itemList: textItemList,
                                    summoner1Id: data.summoner1Id,
                                    summoner2Id: data.summoner2Id,
                                    summonerName: summonerName,
                                    teamPosition: data.teamPosition,
                                    win: data.win,
                                });
                            });
                            i++;
                            break;
                    }
                } else {
                    i++;
                    console.log(matchList[i].matchId, '이미 저장됨');
                }
            }
        }, 200);
    };

    getMatchList = async (summoner) => {
        const matchList = await this.api.getMatchList(summoner);

        if (typeof matchList === 'object') {
            for (let i = 0; i < matchList.length; i++) {
                const result = await this.saveDataRepository.saveMatchList(
                    matchList[i]
                );
                if (result === true) console.log(matchList[i], '저장완료');
            }
            return;
        } else {
            return console.log('API 호출실패로 대기');
        }
    };

    saveMatchData = async (tier) => {
        if (tier === undefined) tier = 'master';
        let i = 0;
        const matchList = await this.saveDataRepository.getMatchDataList(tier);
        console.log(matchList.length, '매치리스트');

        const saveMatchInterval = setInterval(async () => {
            if (i >= matchList.length) {
                console.log('=============매치저장종료=============');
                clearInterval(saveMatchInterval);
            } else {
                // findOrCreate
                const findMatchId = await this.saveDataRepository.findMatchById(
                    matchList[i].matchId
                );
                if (!findMatchId) {
                    console.log(`${tier}티어${i}번째 매치데이터 저장`);
                    const matchData = await this.api.findMatchData(
                        matchList[i],
                        i
                    );

                    switch (typeof matchData) {
                        case 'string':
                            console.log(matchData);
                            break;
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

                                const summonerName = data.summonerName
                                    .split(' ')
                                    .join('');

                                this.saveDataRepository.saveMatchData({
                                    matchId: matchData.metadata.matchId,
                                    matchTier: matchData.tier,
                                    matchDate: matchDate,
                                    championId: data.championId,
                                    championName: data.championName,
                                    championTransform: data.championTransform,
                                    itemList: textItemList,
                                    summoner1Id: data.summoner1Id,
                                    summoner2Id: data.summoner2Id,
                                    summonerName: summonerName,
                                    teamPosition: data.teamPosition,
                                    win: data.win,
                                });
                            });
                            i++;
                            break;
                    }
                } else {
                    console.log(`${tier} 매치데이터 업데이트를 완료하였습니다`);
                    clearInterval(saveMatchInterval);
                    switch (tier) {
                        case 'CHALLENGER':
                            this.saveMatchData('GRANDMASTER');
                            break;
                        case 'GRANDMASTER':
                            this.saveMatchData('MASTER');
                            break;
                        case 'MASTER':
                            this.saveMatchData('DIAMOND');
                            break;
                        case 'DIAMOND':
                            this.saveMatchData('PLATINUM');
                            break;
                        case 'PLATINUM':
                            this.saveMatchData('GOLD');
                            break;
                        case 'GOLD':
                            this.saveMatchData('SILVER');
                            break;
                        case 'SILVER':
                            this.saveMatchData('BRONZE');
                            break;
                        default:
                            this.saveRatings();
                    }
                }
            }
        }, 1200);
    };

    saveRatings = async () => {
        console.log('레이팅 저장 시작');
        for (let i = 0; i < championData.length; i++) {
            await this.saveRating(i);
        }
        this.getLeagueList('challenger');
    };

    saveRating = async (i) => {
        console.log(championData[i].engName, ' 데이터를 불러옵니다');
        const matchDataList = await this.saveDataRepository.getChampionById(
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
                    challenger.push(matchData);
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

        const tierList = [
            challenger,
            grandmaster,
            master,
            diamond,
            platinum,
            gold,
            silver,
            bronze,
        ];

        const rateByitemResult = await this.ratingByitem(tierList);

        await rateByitemResult.map((data) => {
            this.saveDataRepository.saveRating(data);
        });

        console.log(championData[i].engName, ' 데이터 갱신 완료 ');
    };

    ratingByitem = async (tierList) => {
        const rateResult = tierList.map((tier) => {
            const calculateResult = coreItemList.map((item) => {
                let pickCount = 0;
                let winCount = 0;
                tier.forEach((data) => {
                    if (data.itemList.indexOf(item) === -1) {
                    } else if (data.win === '0') {
                        pickCount++;
                    } else {
                        pickCount++;
                        winCount++;
                    }
                });

                return {
                    championId: tier[0].championId,
                    tier: tier[0].matchTier,
                    itemId: item,
                    totalMatch: tier.length,
                    pickRate: ((pickCount / tier.length) * 100).toFixed(2),
                    winRate: ((winCount / pickCount) * 100).toFixed(2),
                };
            });

            return calculateResult;
        });

        return rateResult;
    };
}

module.exports = SaveDataService;
