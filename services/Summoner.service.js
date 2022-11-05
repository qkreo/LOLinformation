// const SummonersRepository = require('../repository/SummonersRepository');

require('dotenv').config()
const axios = require('axios')
const riotUrl = "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations";

class SummonersService {
    // summonersRepository = new SummonersRepository()

    getUserData = async () => {
        let response = null;
       
        response = await axios.get(`${riotUrl}?api_key=${process.env.API_KEY}`);
            
        return response();
    };
}

module.exports = SummonersService;
