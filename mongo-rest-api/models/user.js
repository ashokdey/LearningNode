'use strict';
const mongoose = require('mongoose');

let User = mongoose.model('User', {
    name : {
        type : String,
        required : true,
        minlength : 5,
        trim : true
    },
    email : {
        type : String,
        required : true,
        minlength : 5,
        trim : true
    },
    password : {
        type : String,
        required : true,
        minlength : 5,
        trim : true
    }
});

module.exports = {User};