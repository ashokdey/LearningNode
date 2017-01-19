const expect    = require('expect');
const request   = require('supertest');
const {app}     = require('./../server/server');
const {Todo}    = require('./../models/todo');
const {User}    = require('./../models/user');

// make the DB empty first
beforeEach((done) => {
    Todo.remove({}).then(() => done());
});

// write tests 
describe ('POST /todos', () => {
    
    it('should create a new todo', (done) => {
        let text = 'make a test suit';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        }).end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((err) => done(err)); 
        });
    });

    it ('should not create a todo for invalid data', (done) => {

        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if(err) {
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(0);
                done();
            }).catch((err) => done(err));
        });
    });

});
