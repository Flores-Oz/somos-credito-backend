// db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("somos_credito", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
