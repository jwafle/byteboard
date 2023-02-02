const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hi World!');
});

app.listen(PORT, '0.0.0.0')