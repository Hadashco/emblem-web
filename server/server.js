const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const addRouter = require('./router');
const sockets = require('./sockets');
const connection = require('./db/db');
const db = connection.db;

const app = express();
const port = 3000;

const log = message => {
  /* eslint-disable no-console */
  console.log(message);
  /* eslint-enable no-console */
};

app.use(bodyParser.json());

app.use(bodyParser.raw({
  limit: '50mb',
}));

app.use(morgan('dev'));

addRouter(app);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname.concat('/../client/index.html')));
});

app.use('/build', express.static(path.join(__dirname.concat('/../client/build'))));
app.use('/assets', express.static(path.join(__dirname.concat('/../client/assets'))));

const server = require('http').Server(app);
sockets.addSockets(server);

db.sync()
  .then(() => {
    server.listen(port, (err) => {
      if (err) { throw err; }
      log(`listening on port: ${port}`);
    });
  })
  .catch(err => log(`Server failed to start: ${err}`));
