'use strict';

const {ObjectID}    = require('mongodb');
const jwt           = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

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

// the function that populates the data in the todo collection
const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(dummyTodos);
    }).then(() => done());
}

// create an id for the user data
const userOneID = new ObjectID();
const userTwoID = new ObjectID();

const dummyUsers = [
    {
        _id : userOneID,
        name : 'Jhon Doe',
        email : 'johndoe@jd.com',
        password : 'dummypass123',
        tokens : [{
            access : 'auth',
            token : jwt.sign({_id : userOneID, access : 'auth'}, 'abc123').toString()
        }]
    },
    {
        _id : userTwoID,
        name : 'Jane Doe',
        email : 'janedoe@gmail.com',
        password : 'secondpassword213'
    }
];

const populateUsers = (done) => {
    User.remove({}).then(() => {
        let userOne =  new User(dummyUsers[0]).save();
        let userTwo =  new User(dummyUsers[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done());
}


module.exports = {
    dummyTodos,
    populateTodos,
    dummyUsers,
    populateUsers
}
