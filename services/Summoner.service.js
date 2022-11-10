// const SummonersRepository = require('../repository/SummonersRepository');

require('dotenv').config();
const axios = require('axios');
const krUrl = 'https://kr.api.riotgames.com/lol/';
const asiaUrl = 'https://asia.api.riotgames.com/lol/'

class SummonersService {
    // summonersRepository = new SummonersRepository()

    getUserData = async (name) => {
        //유저 puuid 추출
        const userPuuid = await axios({
            method: 'get',
            url: `${krUrl}summoner/v4/summoners/by-name/${name}`,
            params: { api_key: process.env.API_KEY },
            responseType: 'json',
        }).then((response) => {
            return response.data.puuid;
        });
        //해당 유저 matchid 추출
        const userMatchid = await axios({
            method: 'get',
            url: `${asiaUrl}match/v5/matches/by-puuid/${userPuuid}/ids`,
            params: { 
                queue: '420',
                start: '0',
                count: '100',
                api_key: process.env.API_KEY
            }
        }).then((response) => {
            return response.data
        });
        //해당 유저 matchid 통해서 매치 데이터 추출
        for(let i = 0; i < userMatchid.length; i++) {
            const userMatchData = await axios({
                method: 'get',
                url: `${asiaUrl}match/v5/matches/${userMatchid[1]}`,
                params: { 
                    api_key: process.env.API_KEY
                },
                responseType: 'json',
            }).then((response) => {
                return console.log(response.data.info.participants)
            });
        }
    };
}

module.exports = SummonersService;
