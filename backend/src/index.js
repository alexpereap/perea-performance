const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./routes/auth.routes');

const app = express();
const port = 3001;

// body parsers for requests
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// enable cors
app.use(cors());

// auth handlers
app.use('/api/auth', auth);

app.get('/', (req, res) => {
  res.send('The backend is here3');
});

app.get('/envs', (req, res) => {
  res.send(process.env.JWT_SECRET);
});

app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`);
});
