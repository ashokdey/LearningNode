const express = require('express');
const fs = require('fs');

const myApp = express();

myApp.get('*', (req, res) => {
    // do the streaming work here
    // send the data as response
    const readStream = fs.createReadStream(__dirname + '/sample-big-file.txt', 'utf8');
    readStream.pipe(res);
    console.log(req.url);
}); 

myApp.listen(3000, () => {
    console.log('listening to port 3000');
})