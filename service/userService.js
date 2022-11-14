// const axios = require('axios')
// const APIKEY = "RGAPI-bfc6e23a-24f0-4abc-8b6f-d50dcc6d8581"

// const summoners = require("../models/summoners")
// const participants = require("../models/participants")

// class UserService {

//     findUser = async() => {
//     const APIUrl = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/%ED%83%91%EC%9D%80%EB%B0%B1%EC%A0%95%EC%B0%A8"
      
//       const response = await axios({
//         method: "get", // [요청 타입]
//         url: APIUrl, // [요청 주소]
//         headers: {
//             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
//             "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
//             "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
//             "Origin": "https://developer.riotgames.com",
//             "X-Riot-Token": APIKEY
//         },
//         responseType: "json"
//     })
//     .then(function(response) {
//         console.log("RESPONSE : " + JSON.stringify(response.data));
//         response.data._id = response.data.id
//         delete response.data.id
//         summoners.create(response.data)
//         return response.data
//     })
//     .catch(function(error) {
//         console.log("ERROR : " + JSON.stringify(error));
//     });
//     return response
// }
// findgame = async() => {
//     const APIUrl = "https://asia.api.riotgames.com/lol/match/v5/matches/KR_6134432920"
//     const response = await axios({
//       method: "get", // [요청 타입]
//       url: APIUrl, // [요청 주소]
//       headers: {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
//           "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
//           "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
//           "Origin": "https://developer.riotgames.com",
//           "X-Riot-Token": APIKEY
//       },
//       responseType: "json"
//   })
//   .then(function(response) {
//     response.data.info.participants.map((participant) =>{
//         participants.create({
//             matchId:response.data.metadata.matchId,
//             championId:participant.championId,
//             championName:participant.championName,
//             championTransform:participant.championTransform,
//             individualPosition:participant.individualPosition,
//             item0:participant.item0,
//             item1:participant.item1,
//             item2:participant.item2,
//             item3:participant.item3,
//             item4:participant.item4,
//             item5:participant.item5,
//             item6:participant.item6,
//             lane:participant.lane,
//             perks:participant.perks,
//             puuid:participant.puuid,
//             role:participant.role,
//             summoner1Id:participant.summoner1Id,
//             summoner2Id:participant.summoner2Id,
//             summonerId:participant.summonerId,
//             summonerName:participant.summonerName,
//             teamPosition:participant.teamPosition,
//             win:participant.win         
//         })    
//       })
//       return true
//   })
//   .catch(function(error) {
//       console.log("ERROR : " + JSON.stringify(error));
//   });
//   return response
// }
// }

// module.exports = UserService ;


