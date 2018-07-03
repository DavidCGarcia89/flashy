var express = require("express");
var cmd = require ("node-cmd");

var app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
});

app.get('/', function (req, res) {
    res.status(200).send("Hay conexión");
});

app.get('/raspberry', function (req, res) {
    const es_numero = new RegExp("^[0-9]+$");
    let pin = req.query.pin;
    if (es_numero.test(pin)){
        pin = pin*1;
        if (pin>1 && pin<27){
            const comando = "py ./src/python-scripts/motorsApp.py " + pin;
            cmd.get(comando,
                function(data, err, stderr) {
                    if (!err) {
                    console.log("¡Llamada con éxito!")
                    res.send('Ok');//¡Llamada con éxito!
                    } 
                    else {
                        console.log("python script cmd error: " + err)
                        res.send('Error');//Hubo un error en la raspberry
                    }
                }
            );
        } else {
            res.send('Pin Incorrecto');//"El pin debe estar entre el 2 y el 26"
        }
    } else {
        res.send('Sin pin');//Se debe definir el pin
    }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});