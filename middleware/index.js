const express = require('express');
const helmet = require('helmet'); // security headers like `x-content-type-options: nosniff`
const morgan = require('morgan'); // request logging

function defaultErrorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  console.warn(`uncaught error for ${req.method} ${req.path}`);
  console.error(err);
  const { message = 'unknown error' } = err;
  res.status(500).send({
    message,
  });
}

module.exports.beforeRoute = app => {
  const isDev = app.get('env') === 'development';

  app.use(express.json());
  app.use(helmet());
  app.use(morgan(isDev ? 'tiny' : 'combined'));
};

module.exports.afterRoute = app => {
  app.use(defaultErrorHandler);
};
