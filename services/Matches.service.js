const MatchesRepository = require('../repositories/Matches.repository');

const championData = require('../dataInfo/champId.js');
const coreItemList = require('../dataInfo/item.js')
const API = require('../apiList');

const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config(); // env환경변수 파일 가져오기

const redisClient = redis.createClient({
   url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
   legacyMode: true, // 반드시 설정 !!
});
redisClient.on('connect', () => {
   console.info('Redis connected!');
});
redisClient.on('error', (err) => {
   console.error('Redis Client Error', err);
});
redisClient.connect().then(); // redis v4 연결 (비동기)
const redisCli = redisClient.v4;
redisCli.flushAll() // redis db 전체 초기화

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

        const myVsEnemy = await redisCli.get(`${myChampionId}and${enemyChampionId}`) // // DB 이용 보다 6배이상의 로딩속도 감소를 보임

        if(myVsEnemy !== null) {
            const  myVsEnemyData = JSON.parse(myVsEnemy)
            return myVsEnemyData
        } else {
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

        const data = JSON.stringify(itemByEnemyResult)

        await redisCli.set(`${myChampionId}and${enemyChampionId}`,data)
        await redisCli.expire(`${myChampionId}and${enemyChampionId}`,10) // 만료 시간 설정 int 는 sec 

        return itemByEnemyResult
    }
    };

    getItem = async(itemId) => {
        const item = await this.matchesRepository.getItemById(itemId)

        item.map((data) => {
            
        })

        return item
    }

    getSummoner = async (summonerName) => {

        const summonerNameInsert = summonerName.replace(' ', '').trim()

        const mostData = await redisCli.get(summonerNameInsert) // DB 이용 보다 6배이상의 로딩속도 감소를 보임
        if(mostData !== null) {
            const summonerMost = JSON.parse(mostData)
            return summonerMost
        } else {
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
        const data = JSON.stringify(rateResultFilter)

        await redisCli.set(summonerNameInsert,data) 
        await redisCli.expire(summonerNameInsert,10) // 만료 시간 설정 int 는 sec 

        return rateResultFilter
        
        }
    }  
}


module.exports = MatchesService;
