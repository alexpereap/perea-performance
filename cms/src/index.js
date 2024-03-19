const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
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

// setup express-session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      // secure: true,
    },
  }),
);

// home handler
app.use(cms);

app.listen(port, () => {
  console.log(`CMS app listening on port ${port}`);
});
