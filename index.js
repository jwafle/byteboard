const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hi World!');
});

app.listen(`0.0.0.0:${env.PORT}`, () => {
  console.log(`Example app listening at http://localhost:${env.PORT}`);
});