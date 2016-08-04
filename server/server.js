var express = require('express');
var morgan = require('morgan');
var addRouter = require('./router');

var app = express();

app.use(morgan('dev'));

addRouter(app);

app.listen(3000, function(err) {
  if (err) {throw err;};
  console.log('listening');
});
