const { Sequelize, Model, DataTypes } = require("sequelize");
import sequelize from "../database/database";

class User extends Model {}
User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        isAlpha: true,
        len: [2, 30]
    },
    email: {
        type: DataTypes.STRING,
        isEmail: true,
        unique: true,
        allowNull: false
    },
    password: { type: DataTypes.STRING, allowNull: false },
}, { sequelize, modelName: "users", timestamps: false });

module.exports = User;