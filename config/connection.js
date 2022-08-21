require('dotenv').config(); // environment variables

const Sequelize = require('sequelize'); // import Sequelize constructor from library

// create connection to database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false
});

module.exports = sequelize;