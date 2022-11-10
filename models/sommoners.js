const mongoose = require("mongoose");

const summonerSchema = new mongoose.Schema({
_id: {
type : String,
required: true,
},
accountId: {
type: String,
required: true,
},
puuid: {
type: String,
},
name: {
type: String
},
profileIconId: {
    type: Number
    },
revisionDate: {
type: Number
},
summonerLevel: {
type: Number
},
},
{
timestamps: true,
});

//새로운 mongoose.schema를 만듦
module.exports = mongoose.model("summoners", summonerSchema);
//모듈로 내보내 줄때, mongoose.model을 내보낼건데 그거 생긴게 postSchema처럼 생겼다~