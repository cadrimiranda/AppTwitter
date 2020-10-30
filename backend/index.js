const spawn = require('child_process').spawn;
const express = require('express');
const { once } = require('events');
const app = express();
const port = 3000;

app.get('/:termo', async (req, res) => {
  const id = req.params.termo;
  const python = spawn('python', ['./scripts/getTwiiter.py', id]);
  let dataToSend = '';

  python.stdout.on('data', function (arrBytes) {
    try {
      let aux = Buffer.from(arrBytes, 'base64').toString();

      aux = aux.replace("b'", 'data:;base64,');
      aux = aux.replace("'", '');
      console.log(aux);
      dataToSend += aux;
    } catch (e) {
      
      console.log(e);
    }
  });

  python.on('error', function (err) {
    console.log(err);
  })

  await once(python, 'close');
  console.log(dataToSend);
  res.send(dataToSend);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
