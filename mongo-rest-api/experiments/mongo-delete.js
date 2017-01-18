const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/JokesApp', (err, db) => {
    if (err){
        return console.log('failed to connect to mongodb server. ', err);
    }

    console.log('Connected to MongoDB Server');

    //deleteMany - delete all the occcurences
    db.collection('Jokes').deleteMany({joke : 'Sample joke 2'}).then((result) => {
        console.log(result.result);
    }, (err) => {
        cosole.log('Error deleting many. E : ', err)
    });

    //deleteOne - deletes only first occurence of all the occurences
    db.collection('Jokes').deleteOne({joke : 'Test 1'}).then((result) => {
        console.log(result.result);
    });

    db.collection('Jokes').findOneAndDelete({joke : 'Test 2'}).then((doc) => {
        console.log(doc);
    }, (err) => {
        console.log('Error find one and delete. E: ', err);
    });

    //close the DB
    // db.close();
});