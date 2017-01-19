'use strict';

const app = require('express')();
const bodyParser = require('body-parser');

const {mongoose} = require('./../db/mongoose');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

// the body-parser middleware
app.use(bodyParser.json());

// create a GET /todos route
app.get('/todos', (req, res) => {
    
    Todo.find().then((data) => {
        res.send({data});
    }, (err) => {
        res.status(400).send(err);
    });
});

// create a POST /todos route 
app.post('/todos', (req, res) => {
    // make a todo and save it into the database
    let todo = new Todo({
        text : req.body.text
    });

    todo.save().then((data) => {
        // send the todo as a response
        res.send(data);
    }, (err) => {
        // send the error as a response
        res.status(400).send(err);
    });
});

app.listen(3000, () => {
    console.log('server listening at port 3000');
});

module.exports = {app};