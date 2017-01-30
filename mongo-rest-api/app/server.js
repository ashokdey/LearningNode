'use strict';
const config        = require('./config/config');
const _             = require('lodash');
const app           = require('express')();
const bodyParser    = require('body-parser');

const {ObjectID}        = require('mongodb');
const {mongoose}        = require('./db/mongoose');
const {Todo}            = require('./models/todo');
const {User}            = require('./models/user');
const {authenticate}    = require('./middlewares/authenticate');

let port = process.env.PORT || 3000;

// the body-parser middleware
app.use(bodyParser.json());

// create a GET /todos route
app.get('/todos', authenticate, (req, res) => {
    
    Todo.find({
        _creator : req.user._id
    }).then((data) => {
        res.send({data});
    }, (err) => {
        res.status(400).send(err);
    });
});

// create a POST /todos route 
app.post('/todos', authenticate, (req, res) => {
    // make a todo and save it into the database
    let todo = new Todo({
        text : req.body.text,
        _creator : req.user._id
    });

    todo.save().then((data) => {
        // send the todo as a response
        res.send(data);
    }, (err) => {
        // send the error as a response
        res.status(400).send(err);
    });
});

// get todos by id GET /todos/id
app.get('/todos/:id', authenticate,  (req, res) => {
    //get the todo id in todoID
    let todoID = req.params.id;

    // if the ID is valid not valid, send a message
    if (!ObjectID.isValid(todoID)) {
        //console.log('Invalid todo ID');
        return res.status(400).send({
            message : 'InvalidID',
            status : 400
        });
    }
    // search for todo with the todo id and the creator
    // do not displa todo if the creator id is different
    Todo.findOne({
        _id : todoID,
        _creator : req.user._id
    }).then((data) => {
        if (!data) {
            return res.status(404).send({
                message : 'Todo not found',
                status : 404
            });
        }

        res.status(200).send({
            todo : data, 
            status : 200
        });

    }).catch((err) => {
        res.sendStatus(400).send({err});
        //console.log('todoId not found');
    });
});

// create the delete todo by id route 
app.delete('/todos/:id', authenticate, (req, res) => {
    let todoID = req.params.id;

    if (!ObjectID.isValid(todoID)) {
        return res.status(400).send({
            message : 'InvalidID',
            status : 400
        });
    }

    Todo.findOneAndRemove({
        _id : todoID,
        _creator : req.user._id
    }).then((data) => {
        if(!data) {
            return res.status(404).send({
                message : 'Todo not found',
                status : 404
            });
        }

        res.status(200).send({
            todo : data,
            status : 200
        });
    }).catch((err)=> res.status(400).send({
        message : 'Error',
        status : 400
    }));
});

app.patch('/todos/:id', authenticate, (req, res) => {
    let todoID = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(todoID)) {
        console.log('id rejected by isValid()');
        return res.status(400).send({
            message : 'InvalidID',
            status : 400
        });
    }
        // check if the completed field is boolena or not 
        // and it's value is  true

    if(_.isBoolean(body.completed) && body.completed) {
        // set the completed as true and the timestamp
        body.completed = true;
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    // update the database
    Todo.findOneAndUpdate({ 
        _id : todoID, 
        _creator : req.user._id 
    }, { $set : body}, {new : true}).then((data) => {
        if (!data) {
            return res.status(404).send({
                message : 'Todo not found',
                status : 404
            });
        }

        res.status(200).send({todo : data, status : 200});

    }).catch((e) => {
        res.status(400).send({
            message : 'Failed to Update',
            status : 400
        });
    });
});

// user routes here 
// POST /users route

app.post('/users', (req, res) => {
    // pick the email name and password using lodash pick method
    let userData = _.pick(req.body, ['name', 'email', 'password']);
    
    // create new instance of the User model
    let user = new User(userData);
    // save the user data inside the DB
    user.save().then(() => {
        ///generate token
        return user.generateAuthToken();

    }).then((token) => {
        res.header('x-auth', token).send({user});
        //console.log('User signup successful');

    }).catch((err) => {
        //console.log('error : ', err);        
        // send the error
        res.status(400).send({
            error : 'error occured',
            status : 400
        })
    })
});

// GET users/me route, using the token header
app.get('/users/me', authenticate, (req, res) => {
    res.status(200).send(req.user)
});

// login route

app.post('/users/login', (req, res) => {
    let userData = _.pick(req.body, ['email', 'password']);
    // search for the user in using the email
    User.findByCredentials(userData.email, userData.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((err) => {
        res.status(400).send({err, status: 400});
    });
});

//logout route

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

// Listen to the port 
app.listen(port, () => {
    console.log('server listening at port : ' + port);
});


module.exports = {app};