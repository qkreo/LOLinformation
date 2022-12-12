'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Summoners extends Model {
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
    Summoners.init(
        {
            id: {
                type: DataTypes.STRING,
                unique: true,
            },
            accountId: {
                type: DataTypes.STRING,
                unique: true,
            },
            puuid: {
                primaryKey: true,
                type: DataTypes.STRING,
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
            },
            profileIconId: {
                // primaryKey: true,
                type: DataTypes.STRING,
            },
            revisionDate: {
                // primaryKey: true,
                type: DataTypes.INTEGER,
            },
            summonerLevel: {
                // primaryKey: true,
                type: DataTypes.INTEGER,
            },
            tier: {
                // primaryKey: true,
                type: DataTypes.STRING,
            },
            rank: {
                // primaryKey: true,
                type: DataTypes.STRING,
            },
            leaguePoints: {
                // primaryKey: true,
                type: DataTypes.STRING,
            },
            wins: {
                // primaryKey: true,
                type: DataTypes.STRING,
            },
            losses: {
                // primaryKey: true,
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: 'Summoners',
        }
    );
    return Summoners;
};
