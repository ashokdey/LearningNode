'use strict';
const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/JokesApp', (err, db) => {
    if (err) {
        return console.log('error connecting to mongodb server');
    }

    console.log('connected to mongodb server');

    db.collection('Jokes').findOneAndUpdate({
        joke : 'Sample joke'
    },
    {
        $set : {
            joke : 'This was updated joke',
            likes : 1
        }
    }, {
        returnOriginal : true
    }).then((updatedDoc) => {
        console.log(updatedDoc);
    }, (err) => {
        console.log('Error updating. E: ', err);
    });

    // display all the jokes after updating 
    db.collection('Jokes').find().toArray().then((docs) => {
        console.log(docs);
    }, (err) => {
        console.log('error displaying all jokes. E: ', err);
    });
    //db.close();
});