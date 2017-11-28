require('dotenv').config();
require('./server/db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = {origin: process.env.CORS};
const api = require('./server/router');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = (process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/dist'));

app.use('/api', api);
app.all('*', function(req, res) {
  res.status(200).sendFile(__dirname + '/dist/index.html');
});

server.listen(port);

module.exports = app;
