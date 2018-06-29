var express = require("express");
var cmd = require ("node-cmd");

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
  /*cmd.get(
      'py ./python-scripts/motors.py',
      function(err, data, stderr){
          if (!err) {
             console.log('the node-cmd cloned dir contains these files :\n\n',data)
          } else {
             console.log('error', err)
          }
      }
  )*/
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});