const request = require('supertest');
let app = require('./server').app;

it('shoud return hello folk response', (done) => {
    request(app)
    .get('/')
    .expect('Hello Folks')
    .end(done);
});