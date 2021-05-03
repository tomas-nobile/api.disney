const { Sequelize, Model, DataTypes } = require('sequelize');
import sequelize from '../database/database'

class Show extends Model {}
Show.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        isAlphanumeric: true,
    },
    description: DataTypes.TEXT,
    movie: { type: DataTypes.BOOLEAN, allowNull: false },
    genre: { type: DataTypes.STRING, allowNull: false },
    rating: DataTypes.DECIMAL(10, 2),
    releaseDate: { type: DataTypes.DATE, allowNull: false },
    image: DataTypes.STRING,

}, { sequelize, modelName: 'shows', timestamps: false });

module.exports = Show;