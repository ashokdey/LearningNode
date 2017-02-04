'use strict';

// impoort the configs
const configs               = require('./configs');

// npm and node modules here
const path                  = require('path');
const express               = require('express');
const expressSession        = require('express-session');
const bodyParser            = require('body-parser');
const ejs                   = require('ejs');
const passport              = require('passport');
const LocalStrategy         = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

// custom modules here 
const db        = require('./db');
const {User}    = require('./models/user');

//create the app
const app = express();
//set the port 
const port = process.env.PORT;

// MIDDLEWARES here

// use the express session 
app.use(expressSession({
    secret : 'this is just a demo test',
    resave : false,
    saveUninitialized : false
}));

// use passport and passport sessions
app.use(passport.initialize());
app.use(passport.session()); 

// use body parser
app.use(bodyParser.urlencoded({extended : true}));

// SETTINGS here 

// set the views 
app.set('view engine', 'ejs');
// set the views folder {because my views are inside /app folder}
app.set('views', path.join(__dirname, '/views'));
// set the static directory
app.use(express.static(__dirname + '/_public'));

// passport serialize and deserialize 

// use this form of code if you have your input fields are named other than usernam and password  
// passport.use(new LocalStrategy({
//     usernameField:'user[username]',
//     passwordField:'user[password]'
//   },
// User.authenticate()));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// custom middlewares 
let isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

// ROUTES here 

app.get('/', (req, res) => {
    res.render('home');
});


app.get('/secret',isLoggedIn, (req, res) => {

    res.render('secret');
});

app.get('/register', (req, res) => {
    res.render('register');
});  

app.post('/register', (req, res) => {
    // register the user
    User.register(new User({ 
        username : req.body.username, 
        _createdAt : new Date().getTime()
    }), req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            console.log('inside passport.authenticate : 80');
            res.redirect('/secret');
        });
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login',passport.authenticate('local', {
        successRedirect : '/secret',
        failureRedirect : '/login'
    }),(req, res) => {
});

app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

// listen to the port
app.listen(port, () => {
    console.log('server started...');
})