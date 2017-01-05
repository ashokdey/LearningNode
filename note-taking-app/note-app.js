'use strict';

const fs    = require('fs');
const _     = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

// load the command objects for yargs
const yargsOptions = fs.readFileSync('yargs-config.json');
// parse the file
const options = JSON.parse(yargsOptions);

const titleOptions    = options.title;
const bodyOptions     = options.body

// get command line arguments using yargs argv
const argv = yargs.command('list', 'List all your notes')
.command('add', 'Add a new note', {
    title : titleOptions,
    body : bodyOptions
})
.command('del', 'Delete a note', {
    title : titleOptions
})
.command('view', 'View a note', {
    title : titleOptions
})
.help()
.argv;
const command = argv._[0];
//console.log(`Command given : ${command}`);

if (command === 'add') 
{
    const note = notes.addNote(argv.title, argv.body);
    note ? console.log('Your note is saved.') 
    : console.log('Title already exists! Choose a different title');
}

else if (command == 'list') 
{
    let gotNotes = notes.getAll();
    console.log(gotNotes);

    if (gotNotes) {
        console.log('Getting all the notes...');
        
        //print each note
        for (let i in gotNotes) {
            notes.printNote(gotNotes[i]);
        }
    }
    else {
        console.log('Currently your note box is empty');
    }
}

else if (command === 'view') 
{
    let requiredNote = notes.getNote(argv.title);

    if (requiredNote.title) {
        notes.printNote(requiredNote);
    }
    else if (requiredNote.empty) {
        console.log('File empty or corrupted');       
    }
    else {
        console.log('Note not found');
    }
}

else if (command === 'del')
{
    const deleted = notes.removeNote(argv.title);
    deleted ? console.log(`Note with title '${argv.title}' deleted`) 
    : console.log ('Invalid Title! Try "node note-app --help"');
}

else 
{
    console.log('Invalid Command. Try Again!');
}