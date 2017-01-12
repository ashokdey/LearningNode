'use strict'

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');

//creating a middleware
app.use((req, res, next) => {
    //get current time
    let timestamp = new Date().toString();
    let data = `${timestamp} ${req.method} ${req.url}\n`;
    console.log(data);
    fs.appendFile('./logs/server.log', data, (err) => {
        if (err) {
            console.log('Erroe logging data to file');
        }
    })
    next();
});

// remove the comments for maintainance
//app.use((req, res, next) => {
//    res.render('maintainance.hbs');
//});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('toUpper', (text) => {
    return text.toUpperCase();
});

//set the views template engine
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle : 'Welcome to my Page',
        message : 'This is made using node',
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle : 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        status : 400,
        errorMessage : 'bad_request'
    });
});

//in case of invalid urls
app.get('*', (req, res) => {
  res.render('404.hbs', {
      pageTitle: '404 Not found'
  });
});

app.listen(5000, () => {
    console.log("Server Running at port number: 5000");
});
