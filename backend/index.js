const express = require('express');
const app = express();
const port = 3000;

const spawn = require('child_process').spawn;
const { once } = require('events');
const path = require('path');

app.listen(port, () => {
  console.log('Example app listening at http://localhost:${port}');
});

app.get('/:termo/:quantidade', async (req, res) => {
  const id = req.params.termo;
  const count = req.params.quantidade;
  console.log('nova requisição com ', id,' com quantidade ', count);

  const python = spawn('python', [path.join(__dirname, 'getTwiiter.py'), id, count]);
  let dataToSend = '';

  python.stdout.on('data', function (arrBytes) {
    try {
      let aux = Buffer.from(arrBytes, 'base64').toString();
      aux = aux.replace("b'", 'data:;base64,');
      aux = aux.replace("'", '');
      dataToSend += aux;
    } catch (e) {
      console.log(e);
    }
  });

  python.on('error', function (err) {
    console.log(err);
  });

  await once(python, 'close');
  res.send(dataToSend);
});
