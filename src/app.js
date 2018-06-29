var express = require("express");
var cmd = require ("node-cmd");

var app = express();

app.get('/', function (req, res) {
  //res.send('Hello World!');
  var pyProcess = cmd.get('python ./public/algoritmo/munkresAlgorithm.py',
        function(data, err, stderr) {
            if (!err) {
              console.log("Llamada a python correcta")
            } 
            else {
                console.log("python script cmd error: " + err)
            }
        }
    );
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});