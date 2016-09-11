const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const addRouter = require('./router');
const sockets = require('./sockets');
const passport = require('passport');
const connection = require('./db/db');
const db = connection.db;
const app = express();

let port = 3000;
if (process.env.HOST_PORT && process.env.HOST_PORT !== '') {
  port = process.env.HOST_PORT;
}

const log = message => {
  /* eslint-disable no-console */
  console.log(message);
  /* eslint-enable no-console */
};

app.use(cookieParser());
app.use(cors({
  origin: ['http://emblemar.com', 'http://localhost:8080'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(bodyParser.raw({
  limit: '50mb',
}));

app.use(morgan('dev'));

addRouter(app);

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
