var express = require('express');
var morgan = require('morgan');
var addRouter = require('./router');
var path = require('path');

var app = express();

app.use(morgan('dev'));

addRouter(app);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/index.html'));
});

app.use('/build', express.static(path.join(__dirname + '/../client/build')));
app.use('/assets', express.static(path.join(__dirname + '/../client/assets')));

app.listen(3000, function(err) {
  if (err) {throw err;};
  console.log('listening');
});
