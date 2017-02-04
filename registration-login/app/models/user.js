'use strict';

const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');
// create the User model
let UserSchema = new mongoose.Schema({
    username : {
        type : String,
        minlength : 5,
        trim : true,
        required : true,
        validate : {
            validator : validator.isEmail,
            message : '{value} is not a valid email'
        }
    },
    password : {
        type : String,
        minlength : 6,
        trim : true,
    },
    _createdAt : {
        type : Number,
        required : true
    }
});

// add the passport mongoose plugin
UserSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User', UserSchema);

module.exports = {User};