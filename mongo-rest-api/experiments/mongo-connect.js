'use strict';

const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/JokesApp', (err, db) => {
    if (err) 
        return console.log('unable to connect MongoDB' + err);      
    console.log('Connected to MongoDB Server');

    // creating a new collection, a table like structure
    db.collection('Jokes').insertOne({
        joke : 'Sample joke 2',
        likes : 0,
    }, (err, result) => {
        if (err) 
            return console.log('unable to insert data' + err);
        
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    // one more users collection
    db.collection('Users').insertOne({
        name : 'Ashok Dey',
        age : 22,
        location : 'Delhi'
    }, (err, result) => {
        if (err)  
            return console.log('Failed to insert data into the user collection');
        
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    // close the database
    db.close();
});