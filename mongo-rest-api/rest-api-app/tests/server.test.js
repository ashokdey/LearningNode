const expect    = require('expect');
const request   = require('supertest');
const {app}     = require('./../server/server');
const {Todo}    = require('./../models/todo');
const {User}    = require('./../models/user');


// seed data 
const dummyTodos = [{
    text : 'first dummy todo'
},{
    text : 'second dummy todo'
},{
    text : 'third dummy todos'
}];


// make the DB empty first
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(dummyTodos)
    }).then(() => done());
});

// write tests 
describe ('GET /todos', () => {
    it('should get all todos', (done) => {

        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.data.length).toBe(3);
        })
        .end(done)
    });
});

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

            Todo.find({text}).then((todos) => {
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
                expect(todos.length).toBe(3);
                done();
            }).catch((err) => done(err));
        });
    });

});
