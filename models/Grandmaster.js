const mongoose = require('mongoose');


const grandmasterSchema = new mongoose.Schema(
    {
        matchId: {
            type: String,
            required: true,
        },
        championId: {
            type: Number,
            required: true,
        },
        championName: {
            type: String,
        },
        championTransform: {
            type: Number,
        },
        individualPosition: {
            type: String,
        },
        item0: {
            type: Number,
        },
        item1: {
            type: Number,
        },
        item2: {
            type: Number,
        },
        item3: {
            type: Number,
        },
        item4: {
            type: Number,
        },
        item5: {
            type: Number,
        },
        item6: {
            type: Number,
        },
        lane: {
            type: String,
        },
        perks: {
            type: Object,
        },
        puuid: {
            type: String,
        },
        role: {
            type: String,
        },
        summoner1Id: {
            type: Number,
        },
        summoner2Id: {
            type: Number,
        },
        summonerId: {
            type: String,
        },
        summonerName: {
            type: String,
        },
        teamPosition: {
            type: String,
        },
        win: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    }
);

//새로운 mongoose.schema를 만듦

module.exports = mongoose.model("grandmasters", grandmasterSchema);
//모듈로 내보내 줄때, mongoose.model을 내보낼건데 그거 생긴게 postSchema처럼 생겼다~
