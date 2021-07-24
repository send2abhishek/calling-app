const { Sequelize } = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
});

module.exports = {
  sequelize,
};
