import * as express from "express";
import * as cmd from "node-cmd";

var app = express();

app.get('/', function (req: any, res: any) {
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