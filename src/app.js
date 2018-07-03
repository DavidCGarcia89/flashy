var express = require("express");
var cmd = require ("node-cmd");

var app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', function (req, res) {
    res.status(200).send("Hay conexión");
});

app.get('/raspberry', function (req, res) {
  const pin = req.query.pin;
  if(pin === undefined){
    res.send("Es necesario indicar el pin de conexión");
  } else {
        const comando = "python3 ./src/python-scripts/motorsApp.py " + pin;
        console.log(comando);
        cmd.get(comando,
            function(data, err, stderr) {
                if (!err) {
                console.log("¡Llamada con éxito!")
                res.status(200).send('¡Llamada con éxito!');
                } 
                else {
                    console.log("python script cmd error: " + err)
                    res.send("Hubo un error en la raspberry");
                }
            }
        );
    }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});