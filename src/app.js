var express = require("express");
var cmd = require ("node-cmd");

var app = express();

app.get('/', function (req, res) {
  var pyProcess = cmd.get('python3 ./src/python-scripts/motorsApp.py',
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
app.get('/raspberry', function (req, res) {
    const pin = req.query.pin;
    if (pin*1 === 10) {
        res.send(true);
    } else {
        res.send(false);
    }
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});