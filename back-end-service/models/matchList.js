'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MatchList extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            MatchList.hasMany(models.MatchData, {
              foreignKey: "matchId",
              targetKey: "matchId",
            });
        }
    }
    MatchList.init(
        {
            matchId: {
                primaryKey: true,
                type: DataTypes.STRING,
            },
            tier: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: 'MatchList',
        }
    );
    return MatchList;
};
