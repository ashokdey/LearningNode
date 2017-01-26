const expect        = require('expect');
const request       = require('supertest');
const {app}         = require('./../server/server');
const {ObjectID}    = require('mongodb');
const {Todo}        = require('./../models/todo');
const {User}        = require('./../models/user');


// seed data 
const dummyTodos = [{
    _id : new ObjectID(),
    text : 'first dummy todo'
},{
    _id : new ObjectID(),    
    text : 'second dummy todo',
    completed : true,
    completedAt : 1484982333753
},{
    _id : new ObjectID(),    
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


describe ('GET /todos/:id', () => {
    it('should return a todo doc', (done) => {
        request(app)
        .get(`/todos/${dummyTodos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(dummyTodos[0].text);
        })
        .end(done);
    });

    it('should give a 404 if id not found', (done) => {
        //create a new id for testing 
        let hexID = new ObjectID();
        request(app)
        .get('/todos/' + hexID)
        .expect(404)
        .expect((res) => {
            expect(res.body.status).toBe(404);
        })
        .end(done);
    });

    it('should return a 400 if id is invalid', (done) => {
        request(app)
        .get(`/todos/${dummyTodos[0]._id.toHexString() + '21'}`)
        .expect(400)
        .expect((res) => {
            expect(res.body.status).toBe(400);
        })
        .end(done);
    });
});

describe('DELETE /todos/:id', () => {

    let hexID = new ObjectID();    

    it('should give 400 for invalid id', (done) => {
        request(app)
        .delete(`/todos/${hexID.toHexString() + '45'}`)
        .expect(400)
        .expect((res) => {
            expect(res.body.status).toBe(400);
        })
        .end(done);
    });

    it('should give 404 if todo not found', (done) => {
        request(app)
        .delete(`/todos/${hexID.toHexString()}`)
        .expect(404)
        .expect((res) => {
            expect(res.body.status).toBe(404);
        })
        .end(done);
    });

    it('should delete a todo for a valid id', (done) => {
        request(app)
        .delete(`/todos/${dummyTodos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.status).toBe(200);
        })
        .end(done);
    });
});

describe('PATCH /todos/:id', () => {

    it('should set completed of a todo as true', (done) => {
        let hexID = dummyTodos[0]._id.toHexString();
        let text = 'This should be the new text';

        request(app)
        .patch(`/todos/${hexID}`)
        .send({
            text,
            completed : true
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done); 
    }); 

    it('should clear completed when todo edited/renamed', (done) => {
        let hexID = dummyTodos[1]._id.toHexString();
        text = 'Renamed to a new task';

        request(app)
        .patch(`/todos/${hexID}`)
        .send({
            completed : false,
            completedAt : null,
            text
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completedAt).toNotExist();
            
        })
        .end(done);

    });

});