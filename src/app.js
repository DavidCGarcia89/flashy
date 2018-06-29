var express = require("express");
var cmd = require ("node-cmd");

var app = express();

app.get('/', function (req, res) {
  var pyProcess = cmd.get('python3 ./src/python-scripts/motors.py',
        function(data, err, stderr) {
            if (!err) {
              console.log("Llamada al cmd correcta")
              res.send('Hello World!');
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