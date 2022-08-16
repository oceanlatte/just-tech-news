const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection'); // import from config folder

const app = express();
const PORT = process.env.PORT || 3001;

// express.json takes incoming POST data and parses into req.body JS obj
app.use(express.json());
// url encoded: takes incoming POST data and converts to key/value parirings
// extended: true, lets express know there may be subarray w/in data so it looks deeper into the data
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// establishes connection to db and server
// 'sync' = Sequelize taking the models and connecting to associated db tables
// {force: false} if set to true it would drop and re-create all db tables on startup
sequelize.sync({ force: true }).then( () => {
  app.listen(PORT, () => console.log('Now listening..'));
});