const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const addRouter = require('./router');

var app = express();
var server = require('http').Server(app);

var port = 3000;

app.use(bodyParser.json())
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
