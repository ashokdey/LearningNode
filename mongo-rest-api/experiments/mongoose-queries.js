'use strict';
const {ObjectID} = require('mongodb');
const {mongoose} = require('./../app/db/mongoose');
const {Todo} = require('./../app/models/todo');
const {User} = require('./../app/models/user');

let todoID = '5880842ef93e9523e07eece8' + '21';
let userID = '587fc1bc462a2b16144f8a07';
 
if (!ObjectID.isValid(todoID)) {
    console.log('Invalid todo ID');
}
else {
    // Todo.find({
    //     _id:id
    // }).then((data) => {
    //     console.log('Todos : ', data);
    // }, (err) => {
    //     console.log(err);
    // });

    // Todo.findOne({
    //     _id: id
    // }).then((data) => {
    //     console.log('Todo : ', data);
    // });

    Todo.findById(todoID).then((data) => {
        //returns todo as null in case of invalid id
        if (!data) {
            return console.log('id not found');
        }
        console.log('Todo by findById : ', data);
    }).catch((err) => console.log(err));
    
}

if (!ObjectID.isValid(userID)) {
    console.log('Invalid user ID'); 
}
else {
    User.findById(userID).then((data) => {
        if (!data) {
            return console.log('User ID not found');
        }
        console.log(data);
    }).catch((err) => console.log(err));
}