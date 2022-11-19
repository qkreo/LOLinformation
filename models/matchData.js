'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MatchData extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Likes.belongsTo(models.PharmacyLikes, {
            //   foreignKey: "pharmacyNum",
            //   targetKey: "pharmacyNum",
            // });
        }
    }
    MatchData.init(
        {
            matchId: {
                type: DataTypes.STRING,
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
            individualPosition: {
                // primaryKey: true,
                type: DataTypes.STRING,
            },
            teamPosition: {
                // primaryKey: true,
                type: DataTypes.STRING,
            },
            itemList: {
                // primaryKey: true,
                type: DataTypes.STRING,
            },
            summoner1Id: {
                // primaryKey: true,
                type: DataTypes.INTEGER,
            },
            summoner2Id: {
                // primaryKey: true,
                type: DataTypes.INTEGER,
            },
            puuid: {
                // primaryKey: true,
                type: DataTypes.STRING,
            },
            summonerId: {
                // primaryKey: true,
                type: DataTypes.STRING,
            },
            summonerName: {
                // primaryKey: true,
                type: DataTypes.STRING,
            },
            win: {
                // primaryKey: true,
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: 'MatchData',
        }
    );
    return MatchData;
};
