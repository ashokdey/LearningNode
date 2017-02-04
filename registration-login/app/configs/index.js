'use strict';
let environment = process.env.NODE_ENV || 'development';

if (environment === 'development') {
    process.env.PORT = 5000;
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/login-register';
}
else if (environment === 'test') {
    process.env.PORT = 5000;
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/login-register-test';
}