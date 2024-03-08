const express = require('express');
const app = express();
require('express-async-errors');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./utils/config');
const { info, error } = require('./utils/logger');
const blogsRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');
const usersRouter = require('./controllers/users');

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

const mongoUrl = config.MONGODB_URI;

mongoose
  .connect(mongoUrl)
  .then(() => {
    info('Connected to MongoDB');
  })
  .catch((err) => {
    error('error', err);
  });

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
