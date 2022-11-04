const axios = require('axios')

const APIUrl = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/"
const APIKEY = "RGAPI-2c2a5a82-f4a9-4147-8796-3b7451e29bd4"

class UserService {

    findUser = async(sommonerId) => {
      
      const response = await axios({
        method: "get", // [요청 타입]
        url: APIUrl+sommonerId, // [요청 주소]
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
            "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": APIKEY
        },
        responseType: "json"
    })
    .then(function(response) {
        console.log("RESPONSE : " + JSON.stringify(response.data));
        return response
    })
    .catch(function(error) {
        console.log("ERROR : " + JSON.stringify(error));
    });
    return response.data
}
}

module.exports = UserService ;


