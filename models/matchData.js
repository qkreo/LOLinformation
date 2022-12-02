'use strict';
const {
Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class MatchData extends Model {
/**
 * Helper method for defining associations.
 * This method is not a part of Sequelize lifecycle.
 * The `models/index` file will call this method automatically.
 */
static associate(models) {
    MatchData.belongsTo(models.MatchList, {
        foreignKey: "matchId",
        targetKey: "matchId",
      });
      
}
}
MatchData.init({
matchId: {
type: DataTypes.STRING,
},
matchTier :{
type: DataTypes.STRING,
},
matchDate:{
type: DataTypes.DATE,
},
championId: {
type: DataTypes.INTEGER,
},
championName: {
type: DataTypes.STRING,
},
championTransform: {
type: DataTypes.INTEGER,
},
teamPosition: {
type: DataTypes.STRING,
},
itemList: {
type: DataTypes.STRING,
},
summoner1Id: {
type: DataTypes.INTEGER,
},
summoner2Id: {
type: DataTypes.INTEGER,
},
summonerName: {
type: DataTypes.STRING,
},
win: {
type: DataTypes.STRING,
},
}, {
sequelize,
modelName: 'MatchData',
});
return MatchData;
};