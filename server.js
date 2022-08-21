const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection'); // import from config folder
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
const hbs = exphbs.create({});


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express.json takes incoming POST data and parses into req.body JS obj
app.use(express.json());
// url encoded: takes incoming POST data and converts to key/value parirings
// extended: true, lets express know there may be subarray w/in data so it looks deeper into the data
app.use(express.urlencoded({ extended: true }));
// required path at top and used in middleware to take all the contents of the
// path 'public' and serve them as static assets
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(require('./controllers/'));


// establishes connection to db and server
// 'sync' = Sequelize taking the models and connecting to associated db tables
// {force: false} if set to true it would drop and re-create all db tables on startup
sequelize.sync({ force: false }).then( () => {
  app.listen(PORT, () => console.log('Now listening...'));
});