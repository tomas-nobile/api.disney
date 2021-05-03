const { Sequelize, Model, DataTypes } = require("sequelize");
import sequelize from "../database/database";

class Character extends Model {}
Character.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        isAlphanumeric: true,
        isLowercase: true,
    },
    description: DataTypes.TEXT,
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        isInt: true,
        min: { args: 0 },
    },
    weight: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    image: DataTypes.STRING,
}, { sequelize, modelName: "characters", timestamps: false });

module.exports = Character;