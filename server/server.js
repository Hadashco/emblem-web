const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const addRouter = require('./router');
const sockets = require('./sockets');

var app = express();

var port = 3000;

app.use(bodyParser.json())
app.use(morgan('dev'));

addRouter(app);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/index.html'));
});

app.use('/build', express.static(path.join(__dirname + '/../client/build')));
app.use('/assets', express.static(path.join(__dirname + '/../client/assets')));

var server = require('http').Server(app);
sockets.addSockets(server);

server.listen(port, function(err) {
  if (err) {throw err;};
  console.log('listening on port ', port);
});
