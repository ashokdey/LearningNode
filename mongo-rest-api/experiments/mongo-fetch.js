// import MongoClient from the mongodb package
const {MongoClient} = require('mongodb');

// connect to mongodb server
MongoClient.connect('mongodb://localhost:27017/JokesApp', (err, db) => {
    if (err) {
        return console.log('Failed to connect to mongoDB server : ' + err);
    }

    console.log('Connected to MongoDB Server');

    //get the count of jokes stored
    db.collection('Jokes').count().then((count) => {
        console.log(`Jokes count = ${count}\n`);
    }, (err) => {
        if (err) {
            return console.log('error getting count', err);
        }
    });

    // fetch all the jokes/documets with 10 likes
    db.collection('Jokes').find({likes : 10}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err)=> {
        if (err) {
            return console.log('Fetch error : ', err);
        }
    });

    //fetch all the users from the db
    db.collection('Users').find().toArray().then((docs) => {
        // print all the users 
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        if(err) {
            return console.log('Error Fetching users : ', err);
        }
    });

    //db.close();
});