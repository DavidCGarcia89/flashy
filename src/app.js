var express = require("express");
var cmd = require ("node-cmd");
var fs =  require("fs");
var exec = require("child_process").exec;


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
    res.send({respuesta: 'Hay conexión'});
});

app.get('/checkPin', function (req, res) {
    const es_numero = new RegExp("^[0-9]+$");
    let pin = req.query.pin;
    if (es_numero.test(pin)) {
        pin = pin*1;
        if (pin>1 && pin<27) {
            const comando = "python3 ./src/python-scripts/checkPin.py " + pin;
            cmd.get(comando,
                function(data, err, stderr) {
                    if (!err) {
                    console.log("¡Llamada con éxito!");
                    res.send({respuesta: 'Ok'});//¡Llamada con éxito!
                    } 
                    else {
                        console.log("python script cmd error: " + err)
                        res.send({respuesta: 'Error'});//Hubo un error en la raspberry
                    }
                }
            );
        } else {
            res.send({respuesta: 'Pin Incorrecto'});//"El pin debe estar entre el 2 y el 26"
        }
    } else {
        res.send({respuesta: 'Sin pin'});//Se debe definir el pin
    }
});

app.get('/checkServo', function (req, res) {
    console.log("Recibida Llamada checkServo")
    const es_numero = new RegExp("^[0-9]+$");
    let pin = req.query.pin;
    let duracionInicial = req.query.durIni || 5;
    let duracionFinal = req.query.durFin || 5;
    let anguloInicial = req.query.angIni || 4.5;
    let anguloFinal = req.query.angFin || 10.5;
    if (es_numero.test(pin)){
        pin = pin*1;
        if (pin>1 && pin<27){
            duracionInicial = duracionInicial*1;
            duracionFinal = duracionFinal*1;
            anguloInicial = anguloInicial*1;
            anguloFinal = anguloFinal*1;
            const comando = "python3 ./src/python-scripts/checkServo.py " + pin + " " + duracionInicial + " " + duracionFinal + " " + anguloInicial + " " + anguloFinal;
            console.log("Llamamos a python3")
            child = exec("egrep --color 'MemTotal' /proc/meminfo | egrep '[0-9.]{4,}' -o", function (error, stdout, stderr) {
                if (error !== null) {
                    console.log("¡Llamada con éxito!")
                    res.send({respuesta: 'Ok'});//¡Llamada con éxito!
                  console.log('exec error: ' + error);
                } else {
                    console.log("python script cmd error: " + err)
                    res.send({respuesta: 'Error'});//Hubo un error en la raspberry
                }
            });
        } else {
            res.send({respuesta: 'Pin Incorrecto'});//"El pin debe estar entre el 2 y el 26"
        }
    } else {
        res.send({respuesta: 'Sin pin'});//Se debe definir el pin
    }
});

//Temperatura, Memoria Total, Memoria Libre, Porcentaje de Mem Usada, Tiempo Levantado.
app.get('/checkStatus', function (req, res) {
    let memTotal, memUsed, upTime;
    //Temperatura
    const temp = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");
    const temp_c = temp/1000;
    console.log("Temperatura: " + temp_c + "ºC");
    //Memoria total
    child = exec("egrep --color 'MemTotal' /proc/meminfo | egrep '[0-9.]{4,}' -o", function (error, stdout, stderr) {
        if (error !== null) {
            res.send({ temperatura: temp_c, memoriaTotal: memTotal, memoriaUsada: memUsed,memoriaLibre:memFree, percentMemUsed: memUsed, uptime: upTime });
          console.log('exec error: ' + error);
        } else {
            memTotal = parseInt(stdout);

            console.log("Memoria Total: " + memTotal + "KB  ");
            child1 = exec("egrep --color 'MemFree' /proc/meminfo | egrep '[0-9.]{4,}' -o", function (error, stdout, stderr) {
                if (error == null) {
                    memFree = parseInt(stdout);
                    console.log("Memoria Libre: " + memFree + "KB");
                    memUsed = memTotal-memFree;
                    console.log("Memoria Usada: " + memUsed + "KB");
                    percentUsed = Math.round(memUsed*100/memTotal);
                    console.log("Porcentaje Mem Usada: " + percentUsed + "%");
                    child = exec("uptime -p", function (error, stdout, stderr) {
                        if (error !== null) {
                            res.send({ temperatura: temp_c, memoriaTotal: memTotal, memoriaUsada: memUsed,memoriaLibre:memFree, percentMemUsed: percentUsed, uptime: upTime });
                            console.log('exec error: ' + error);
                        } else {
                            upTime = stdout.split("\n")[0];
                            console.log("Up Time" + upTime);
                            res.send({ temperatura: temp_c, memoriaTotal: memTotal, memoriaUsada: memUsed,memoriaLibre:memFree, percentMemUsed: memUsed, uptime: upTime });
                        }
                    });
                } else {
                res.send({ temperatura: temp_c, memoriaTotal: memTotal, memoriaUsada: memUsed,memoriaLibre:memFree, percentMemUsed: memUsed, uptime: upTime });
                console.log('exec error: ' + error);
                }
            });
        }
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});