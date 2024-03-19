const express = require('express');
const bodyParser = require('body-parser');
const cms = require('../routes/cms.routes');

const app = express();
const port = 3000;

// body parsers for requests
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// home handler
app.use(cms);

app.listen(port, () => {
  console.log(`CMS app listening on port ${port}`);
});
