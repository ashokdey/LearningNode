/***
 * Streams breaks large files into smaller chunks that 
 * can travel on the network easily.
 */

const fs = require('fs');

// read a file
let readStream = fs.createReadStream(__dirname + '/sample-big-file.txt', 'utf8');

//use the .on() method to take the chunk and write it to another file

// create a new file
let writeStream = fs.createWriteStream(__dirname + '/write-big-file.txt');

let i = 1;

readStream.on('data', (chunk) => {
    console.log('chunk received :' + i++);
    writeStream.write(chunk);
});

//it took 6 chunks to completely read the sample-big-file.txt

/**
 * Using Pipes
 * ----------------
 * when we use pipes, then we do not manually need to do the writing task 
 * by taking the chunks. The .pipe() method does everything for us
*/

//create a new write file to write the data using pipes
let writeStreamPipe = fs.createWriteStream(__dirname + '/write-big-pipe.txt');

readStream.pipe(writeStreamPipe)