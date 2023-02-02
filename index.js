const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hi World!');
});

app.listen($PORT, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
