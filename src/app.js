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
        setTimeout(() => {
            res.send(true);
        }, 2000);
        
    } else {
        setTimeout(() => {
            res.send(false);
        }, 1000);
        
    }
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});