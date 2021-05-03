const { Sequelize, Model, DataTypes } = require("sequelize");
import sequelize from "../database/database";

class Show_Character extends Model {}
Show_Character.init({

}, { sequelize, modelName: "show_character", timestamps: false });

module.exports = Show_Character