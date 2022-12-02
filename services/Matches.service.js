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
}


module.exports = MatchesService;
