'use strict';
const mongoose = require('mongoose');

// set mongoose to use promises
mongoose.Promise = global.Promise;

// connect to the database
mongoose.connect(process.env.MONGODB_URI);

// export mongoose
module.exports = {mongoose};