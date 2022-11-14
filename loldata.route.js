// https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/{summonerName}
// 소환사명 파라미터로 넣고 겟요청

//response
// {
//     "id": "3JhCBRrfNwGC8HFnS7I5SK-QtDU6QiRkJOPKHC8PFtX1Xg",  //암호화된 summonerid
//     "accountId": "mOMTW_bPrjobreYN1ufxevK-RbKqiDfThXZ8yzrrFE4",  //암호화된 accountId
//     "puuid": "2DWBKKM-ceh5vjw9QPca1R4dKnv-BmzGUMMd5H1VrsAXVqvA5Yj_QedxUaXaGowfTyaO1ugt6wmsiw",// 암호화된 puuid
//     "name": "hide on bush", //소환사명
//     "profileIconId": 5528,   //프로필 아이콘 아이디
//     "revisionDate": 1667041719000,  //마지막 접속시간
//     "summonerLevel": 288 // 소환사 레벨
// }


// https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/{encryptedSummonerId}

// 암호화된 summonerid값으로 검색
// 소환사 정보 검색
// //[
//     {
//         "leagueId": "0f6fdfd3-1171-4f47-a300-3e4c015c9c73",
//         "queueType": "RANKED_SOLO_5x5",
//         "tier": "DIAMOND",
//         "rank": "I",
//         "summonerId": "OqSeEHWxL6Q8uWejCy8o2HL8wzSFnypWULjTTEkOTi9ysA",
//         "summonerName": "Hide on bush",
//         "leaguePoints": 75,
//         "wins": 524,
//         "losses": 465,
//         "veteran": false,
//         "inactive": false,
//         "freshBlood": false,
//         "hotStreak": true
//     }
// ]

// https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId} 

// 암호화된 summonerid값으로 검색
// 챔피언 숙련도 검색

// https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/{encryptedSummonerId}

// 암호화된 summonerid값으로 검색
// 현재 진행중인 게임이 있는지
// // {
//     "gameId": 6202882675,
//     "mapId": 12,
//     "gameMode": "ARAM",
//     "gameType": "MATCHED_GAME",
//     "gameQueueConfigId": 450,
//     "participants": [
//         {
//             "teamId": 100, // 사용자 팀 100이 블루 200이 레드
//             "spell1Id": 32, // d칸에 있는 스펠
//             "spell2Id": 4, // f칸에 있는 스펠
//             "championId": 58,  //사용중인 챔피언
//             "profileIconId": 3533,  // 프로필 아이콘
//             "summonerName": "천둥 호랑",   //닉네임
//             "bot": false,
//             "summonerId": "JRNzH_8WTPQEmxJoDFypLLPXho4_nwSis1NJo3NquSxUxA",   //암호화된 소환사 아이디
//             "gameCustomizationObjects": [],   
//             "perks": {
//                 "perkIds": [   // 룬 찍은거 확인
//                     8010,
//                     9111,
//                     9105,
//                     8299,
//                     8446,
//                     8451,
//                     5005,
//                     5008,
//                     5002
//                 ],
//                 "perkStyle": 8000,  //룬 스타일 (뭐 정복자쪽 트리인지, 어수쪽 트리인지 이런건가봄)
//                 "perkSubStyle": 8400  //서브 룬 스타일
//             }
//         },
//         {
//             "teamId": 100,
//             "spell1Id": 4,
//             "spell2Id": 6,
//             "championId": 61,
//             "profileIconId": 4661,
//             "summonerName": "쥬아요",
//             "bot": false,
//             "summonerId": "5323RErt9Mo_nkCPm-fFgYEDLVx8yX0KXniEEJZZyUgkalk",
//             "gameCustomizationObjects": [],
//             "perks": {
//                 "perkIds": [
//                     8128,
//                     8126,
//                     8138,
//                     8106,
//                     8009,
//                     8014,
//                     5008,
//                     5008,
//                     5001
//                 ],
//                 "perkStyle": 8100,
//                 "perkSubStyle": 8000
//             }
//         },
//         {
//             "teamId": 100,
//             "spell1Id": 32,
//             "spell2Id": 4,
//             "championId": 777,
//             "profileIconId": 1387,
//             "summonerName": "화 찰",
//             "bot": false,
//             "summonerId": "bQvRkZalYEHPgnCerSjaBfejn6WS9MglNiEwkXJ1ONdynVg3",
//             "gameCustomizationObjects": [],
//             "perks": {
//                 "perkIds": [
//                     8008,
//                     9111,
//                     9104,
//                     8014,
//                     8143,
//                     8135,
//                     5005,
//                     5008,
//                     5003
//                 ],
//                 "perkStyle": 8000,
//                 "perkSubStyle": 8100
//             }
//         },
//         {
//             "teamId": 100,
//             "spell1Id": 6,
//             "spell2Id": 4,
//             "championId": 67,
//             "profileIconId": 4568,
//             "summonerName": "시에수 노무다라",
//             "bot": false,
//             "summonerId": "X6-wkoccLdohxBercIQPWU9NzymWxJxVMo2ciwr7R5uoir8",
//             "gameCustomizationObjects": [],
//             "perks": {
//                 "perkIds": [
//                     8008,
//                     9111,
//                     9104,
//                     8014,
//                     8138,
//                     8135,
//                     5005,
//                     5008,
//                     5002
//                 ],
//                 "perkStyle": 8000,
//                 "perkSubStyle": 8100
//             }
//         },
//         {
//             "teamId": 100,
//             "spell1Id": 3,
//             "spell2Id": 4,
//             "championId": 53,
//             "profileIconId": 907,
//             "summonerName": "마 스 터 피 쓰",
//             "bot": false,
//             "summonerId": "ltZEf06hRKk72BGlGKtJMpfr0Nc2nn1CUzKlYUuTjR8POEN861hzm7DO8Q",
//             "gameCustomizationObjects": [],
//             "perks": {
//                 "perkIds": [
//                     8128,
//                     8126,
//                     8138,
//                     8134,
//                     8009,
//                     9105,
//                     5007,
//                     5008,
//                     5001
//                 ],
//                 "perkStyle": 8100,
//                 "perkSubStyle": 8000
//             }
//         },
//         {
//             "teamId": 200,
//             "spell1Id": 3,
//             "spell2Id": 4,
//             "championId": 26,
//             "profileIconId": 5259,
//             "summonerName": "주거쩝",
//             "bot": false,
//             "summonerId": "6mJDdIK0_WhWWc9PLWOFay5XwqpP0sgyWOvPZiajNkZpqQ",
//             "gameCustomizationObjects": [],
//             "perks": {
//                 "perkIds": [
//                     8128,
//                     8126,
//                     8138,
//                     8106,
//                     8009,
//                     8014,
//                     5007,
//                     5008,
//                     5002
//                 ],
//                 "perkStyle": 8100,
//                 "perkSubStyle": 8000
//             }
//         },
//         {
//             "teamId": 200,
//             "spell1Id": 32,
//             "spell2Id": 4,
//             "championId": 104,
//             "profileIconId": 982,
//             "summonerName": "Love is game",
//             "bot": false,
//             "summonerId": "MkjdB1B-kDtOAAySbLZ31fYVw2fyvVxpD7COrMZXmICwafc",
//             "gameCustomizationObjects": [],
//             "perks": {
//                 "perkIds": [
//                     8021,
//                     8009,
//                     9103,
//                     8014,
//                     8139,
//                     8135,
//                     5005,
//                     5008,
//                     5002
//                 ],
//                 "perkStyle": 8000,
//                 "perkSubStyle": 8100
//             }
//         },
//         {
//             "teamId": 200,
//             "spell1Id": 32,
//             "spell2Id": 4,
//             "championId": 518,
//             "profileIconId": 683,
//             "summonerName": "zl존or기곰돌e",
//             "bot": false,
//             "summonerId": "bYsqRAGla8t5EbA0neAJeMNaLtcFO-tIVava6NRQsHfzo9Y",
//             "gameCustomizationObjects": [],
//             "perks": {
//                 "perkIds": [
//                     8128,
//                     8126,
//                     8138,
//                     8106,
//                     8009,
//                     8014,
//                     5007,
//                     5008,
//                     5001
//                 ],
//                 "perkStyle": 8100,
//                 "perkSubStyle": 8000
//             }
//         },
//         {
//             "teamId": 200,
//             "spell1Id": 32,
//             "spell2Id": 4,
//             "championId": 126,
//             "profileIconId": 5454,
//             "summonerName": "OI구OrLr",
//             "bot": false,
//             "summonerId": "msA1xNnBagFaif6qfRHJ-bSMf4FAJ9mIhk9diKe2VJObXeo",
//             "gameCustomizationObjects": [],
//             "perks": {
//                 "perkIds": [
//                     8128,
//                     8139,
//                     8138,
//                     8135,
//                     8226,
//                     8210,
//                     5007,
//                     5003,
//                     5002
//                 ],
//                 "perkStyle": 8100,
//                 "perkSubStyle": 8200
//             }
//         },
//         {
//             "teamId": 200,
//             "spell1Id": 32,
//             "spell2Id": 4,
//             "championId": 80,
//             "profileIconId": 5256,
//             "summonerName": "이 동리",
//             "bot": false,
//             "summonerId": "vHZlqtc2ZeQCahrYZZ_YzBPC7o12Zej7LPo4GwLx8krPess",
//             "gameCustomizationObjects": [],
//             "perks": {
//                 "perkIds": [
//                     8010,
//                     8009,
//                     9105,
//                     8014,
//                     8139,
//                     8135,
//                     5008,
//                     5008,
//                     5001
//                 ],
//                 "perkStyle": 8000,
//                 "perkSubStyle": 8100
//             }
//         }
//     ],
//     "observers": {
//         "encryptionKey": "PSmfh2sUrhWXVGk6jFwEhcSVcMA+nDPY"
//     },
//     "platformId": "KR",
//     "bannedChampions": [],
//     "gameStartTime": 1667640131711,
//     "gameLength": 107
// }


// https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count20&api_key=~~~~~~~~~~~~~~~~



// 최근 20경기 검색
// 파라미터로 start값이랑, 카운트값 뭐 주느냐에 따라 달라지는듯함

// [
//     "KR_6202843589",
//     "KR_6202801904",
//     "KR_6202769068",
//     "KR_6201303490",
//     "KR_6201259512",
//     "KR_6199845602",
//     "KR_6198617558",
//     "KR_6198595660",
//     "KR_6197626438",
//     "KR_6197624245",
//     "KR_6197569374",
//     "KR_6197556604",
//     "KR_6196313132",
//     "KR_6196238929",
//     "KR_6196186940",
//     "KR_6196222245",
//     "KR_6194610418",
//     "KR_6194520234",
//     "KR_6194446401",
//     "KR_6194397108"
// ]
require('dotenv').config()

const LeagueJS = require('leagueJS');

const leagueJs = new LeagueJS(process.env.API_KEY);