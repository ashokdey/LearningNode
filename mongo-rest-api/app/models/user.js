'use strict';
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
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


UserSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id : user._id.toHexString(), access}, 'abc123').toString();
    
    // console.log('Token generated : ' + token);
    
    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
}

UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
}

let User = mongoose.model('User', UserSchema);


module.exports = {User};