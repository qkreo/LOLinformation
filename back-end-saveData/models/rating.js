'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Rating extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
           
        }
    }
    Rating.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
            },
            championId: {
                type: DataTypes.INTEGER,
            },
            tier: {
                type: DataTypes.STRING,
            },
            itemId: {
                type: DataTypes.INTEGER,
            },
            totalMatch:{
                type: DataTypes.INTEGER,
            },
            pickRate: {
                type: DataTypes.REAL,
            },
            winRate: {
                type: DataTypes.REAL,
            }
        },
        {
            sequelize,
            modelName: 'Rating',
        }
    );
    return Rating;
};