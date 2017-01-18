'use strict';

const app = require('express')();
const bodyParser = require('body-parser');

const {mongoose} = require('../db/mongoose');
const {Todo} = require('../models/todo');
const {User} = require('../models/user');

// the body-parser middleware
app.use(bodyParser.json());

// create a post route 
app.post('/todo', (req, res) => {
    // make a todo and save it into the database
    let todo = new Todo({
        text : req.body.text
    });

    todo.save().then((data) => {
        // send the todo as a response
        res.send(data);
        console.log('Todo : ', JSON.stringify(todo, undefined, 2));
    }, (err) => {
        // send the error as a response
        res.status(400).send(err);
        console.log('Error saving todo. E: ', err);
    });
});

app.listen(3000, () => {
    console.log('server listening at port 3000');
});