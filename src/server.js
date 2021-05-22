'use strict';

const express = require('express');
const notFound = require('./error-handlers/404');
const serverError = require('./error-handlers/500');
const logger = require('./middleware/logger');

const foodRouter = require('./routes/food.js');
const clotheRouter = require('./routes/clothes.js');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);
app.use('/food', foodRouter);
app.use('/clothes', clotheRouter);
app.use('*', notFound);
app.use(serverError);



module.exports = {
  app: app,
  start:start,
};

function start(port) {
  app.listen(port, () => console.log(`Server is listening to port ${port}`));
}





