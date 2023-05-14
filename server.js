const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const routes = require('./routes');
const sequelize = require('./config/connection');
const auth = require('./utils/auth');


const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({auth});

const sessionConfig = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
