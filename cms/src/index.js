const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cms = require('./routes/cms.routes');

const app = express();
const port = 3000;

// body parsers for requests
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// ejs as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// use bootstrap
app.use(express.static(`${__dirname}/../node_modules/bootstrap/dist`));
app.use(express.static(`${__dirname}/public`));

// setup session storage
const dbConn = {
  host: process.env.RDS_HOST,
  port: 3306,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
};

const sessionStore = new MySQLStore(dbConn);

sessionStore.onReady().then(() => {
  // MySQL session store ready for use.
  console.log('MySQLStore ready');
}).catch((error) => {
  // Something went wrong.
  console.error(error);
});

// setup express-session
app.use(
  session({
    name: 'perea-performance-sess',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 24, // 24 hr
      secure: process.env.NODE_ENV === 'production',
    },
    store: sessionStore,
  }),
);

// home handler
app.use(cms);

app.listen(port, () => {
  console.log(`CMS app listening on port ${port}`);
});
