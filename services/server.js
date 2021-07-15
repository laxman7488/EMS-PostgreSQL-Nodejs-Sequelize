const http = require('http');
const express = require('express');
const morgan = require('morgan');
const router = require('../router');
const expressValidator = require('express-validator');

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);

    app.use(morgan('combined'));

    app.use(express.json({
      reviver: reviveJson
    }));
    app.use(expressValidator()); 

    app.use('/', router);

    httpServer.listen(8888)
      .on('listening', () => {
        console.log(`Server is up and running on:8888`);

        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

module.exports.initialize = initialize;

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.close = close;

const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

function reviveJson(key, value) {
  if (typeof value === 'string' && iso8601RegExp.test(value)) {
    return new Date(value);
  } else {
    return value;
  }
}
