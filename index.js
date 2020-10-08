const spawn = require('child_process').spawn;
const express = require('express');
const app = express();
const port = 3000;

app.get('/:termo', async (req, res) => {
    const id = req.params.termo;
    const python = spawn('python', ['getTwiiter.py', id]);
    let dataToSend;
    python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...',data);
      dataToSend = data.toString();
     });

     python.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);
      // send data to browser
      res.send(dataToSend)
      });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});