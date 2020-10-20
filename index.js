const spawn = require('child_process').spawn;
const express = require('express');
const app = express();
const port = 3000;
//const Buffer = require('buffer');

app.get('/:termo', async (req, res) => {
    const id = req.params.termo;
    const python = spawn('python', ['getTwiiter.py', id]);
    let dataToSend;
    python.stdout.on('data', function (arrBytes) {
    
      try
      {
        //const buffer = new Buffer();

        let aux = Buffer.from(arrBytes,'base64').toString();
        
        aux = aux.replace("b'","data:;base64,");
        aux = aux.replace("'","");
        
        console.log('Pipe data from python script ...',aux);
        console.log(aux[0],aux[aux.length-1]);
        dataToSend = aux;
        res.send(dataToSend)
      }
      catch(e){
        console.log(e);
      }
     });

     python.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);
      // send data to browser
      //res.send(dataToSend)
      });
      
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});