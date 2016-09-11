const path = require('path');
const express = require('express');
const app = express();

let port = 8080;
if (process.env.HOST_MODE === "PROD") {
  port = 80;
}

const log = message => {
  /* eslint-disable no-console */
  console.log(message);
  /* eslint-enable no-console */
};

app.use('/build', express.static(path.join(__dirname.concat('/build'))));
app.use('/assets', express.static(path.join(__dirname.concat('/assets'))));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname.concat('/index.html')));
});

app.listen(port, (err) => {
  if (err) { throw err; }
  log(`listening on port: ${port}`);
})
