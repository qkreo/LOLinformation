const MatchesRepository = require('../repositories/Matches.repository');

const championData = require('../dataInfo/champId.js');
const coreItemList = require('../dataInfo/item.js')

const API = require('../apiList');

class MatchesService {
    constructor() {
        this.matchesRepository = new MatchesRepository();
        this.api = new API();
    }

    getEnemyById = async (myChampionId, enemyChampionId) => {
        const rate = await this.matchesRepository.getEnemyById(
            myChampionId,
            enemyChampionId
        );
        return rate;
    };

    getChampion = async (championId) => {
        const champion = await this.matchesRepository.getChampion(championId);

        return champion;
    };

    getWinRatingByChamp = async (myChampionId, enemyChampionId) => {
        const matchData = await this.matchesRepository.getEnemyById(
            myChampionId, enemyChampionId
        );
        
        const itemByEnemy= coreItemList.map((item) => {
            let pickCount = 0;
            let winCount = 0;

            matchData.forEach((data) => {
                if(data.itemList.search(item) === -1){ } 
                else if (data.win === '0') { pickCount++;}
                else {pickCount++; winCount++;}
            })

            return {
                myChampionId: myChampionId,
                enemyChampionId: enemyChampionId,
                itemId: item,
                pickRate: ((pickCount/matchData.length)*100).toFixed(2),
                winRate: ((winCount/pickCount)*100).toFixed(2)
            }
        })
        const itemByEnemyResult = [];

        itemByEnemy.forEach((data)=> {
            if(data.pickRate > 2 ) {
                itemByEnemyResult.push(data)
            }
        })
        
        itemByEnemyResult.sort((a, b) => b.pickRate - a.pickRate)

        return itemByEnemyResult
    };

    getItem = async(itemId) => {
        const item = await this.matchesRepository.getItemById(itemId)

        item.map((data) => {
            
        })

        return item
    }

    getSummoner = async (summonerName) => {

        const summonerNameInsert = summonerName.replace(' ', '').trim()

        const summoner = await this.matchesRepository.getSummoner(summonerNameInsert)

        const summonerWinRateByChamp = championData.map((champ)=> {
            let champPickCount = 0;
            let champWinCount = 0;

            summoner.forEach((matchData) => {
                if(champ.id !== matchData.championId) {}
                else if (matchData.win === '0') {champPickCount++;}
                else {champPickCount++; champWinCount++;}
            })

            const summonerWinRateByitem = coreItemList.map((item) => {

                let itemPickCount = 0;
                let itemWinCount = 0;

                summoner.forEach((matchData) => {
                    if(champ.id !== matchData.championId) {}
                    else {
                        if(matchData.itemList.search(item) === -1) {}
                        else if(matchData.win === '0') { itemPickCount++; }
                        else { itemPickCount++; itemWinCount++;}
                    }
                })
            
                const summonerWinRateByitemResult = {
                    itemId : item,
                    itemPickRate : ((itemPickCount/champPickCount)*100).toFixed(2),
                    itemWinRate : ((itemWinCount/itemPickCount)*100).toFixed(2)
                }
                return summonerWinRateByitemResult
            })

            const summonerWinRateByitemFilter = summonerWinRateByitem.filter(data => data.itemPickRate > 2)

            summonerWinRateByitemFilter.sort((a, b) => b.itemPickRate - a.itemPickRate)
            
            const summonerWinRateByChampResult = {
                chmpionName: champ.engName,
                championId: champ.id,
                totalMatch: champPickCount,
                champPickRate: ((champPickCount/summoner.length)*100).toFixed(2),
                champWinRate: ((champWinCount/champPickCount)*100).toFixed(2),
                itemWinRate: summonerWinRateByitemFilter
            }

            return summonerWinRateByChampResult
        })

        const rateResultFilter = summonerWinRateByChamp.filter(data => data.totalMatch !== 0)

        rateResultFilter.sort((a,b) => b.totalMatch - a.totalMatch)

        return rateResultFilter
        
    }
}


module.exports = MatchesService;
