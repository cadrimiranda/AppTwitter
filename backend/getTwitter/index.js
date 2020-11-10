const spawn = require('child_process').spawn;
const { once } = require('events');
const path = require('path');

module.exports = function (app) {
  app.get('/:termo', async (req, res) => {
    const id = req.params.termo;
    const python = spawn('python', ['getTwiiter.py', id]);
    let dataToSend = '';

    python.stdout.on('data', function (arrBytes) {
      console.log('eu');
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
};
