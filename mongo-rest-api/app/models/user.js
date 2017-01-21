'use strict';
const mongoose = require('mongoose');
const validator = require('validator');

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
        trim : true,
        unique : true,
        validate : {
            validator : validator.isEmail,
            message : '{value} is invalid email'
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 5, 
        trim : true
    },
    tokens : [{
        access : {
            type : String,
            required : true
        },
        token : {
            type : String,
            required : true
        }
    }] 
});

module.exports = {User};