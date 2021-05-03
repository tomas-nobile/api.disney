import Sequelize from "sequelize";
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
    }
);

module.exports = sequelize