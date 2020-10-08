const spawn = require('child_process').spawn;
const express = require('express');
const app = express();
const port = 3000;

app.get('/:termo', async (req, res) => {
    const id = req.params.termo;
  res.send(`Termo do twitter ${id}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});