const express = require('express');
const app = express();
const port = 3000;
const getTwitter = require('./getTwitter/index');

getTwitter(app);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
