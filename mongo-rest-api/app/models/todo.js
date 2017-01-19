'use strict';
const mongoose = require('mongoose');

let Todo = mongoose.model('Todo', {
    text : {
        type : String,
        required : true,
        minlength : 5,
        trim : true
    },
    completed : {
        type : Boolean,
        default : false
    },
    completedAt : {
        type : Number,
        default : null
    }
});

module.exports = {Todo};