const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('The backend is here')
})

app.get('/envs', (req, res) => {
  res.send(process.env.RDS_DB_NAME)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})