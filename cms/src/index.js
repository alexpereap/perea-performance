const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cms = require('./routes/cms.routes');

const app = express();
const port = 3000;

// body parsers for requests
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// ejs as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// home handler
app.use(cms);

app.listen(port, () => {
  console.log(`CMS app listening on port ${port}`);
});
