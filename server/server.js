var express = require('express');
var morgan = require('morgan');
var addRouter = require('./router');
var path = require('path');
var connection = require('./db/db');

var app = express();

var port = 3000;

app.use(morgan('dev'));

addRouter(app);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/index.html'));
});

app.use('/build', express.static(path.join(__dirname + '/../client/build')));
app.use('/assets', express.static(path.join(__dirname + '/../client/assets')));

app.listen(port, function(err) {
  if (err) {throw err;};
  console.log('listening on port ', port);
});
