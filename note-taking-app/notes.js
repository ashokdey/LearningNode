'use strict';

const fs = require('fs');

/*
-----------------Functions not to be exported ------------------
*/

let fetchNotes = () => 
{
    try {
        // if the file already exixsts, read all the contents from it
        // use Sync version so that work is synchronized    
        let notesData = fs.readFileSync('./storage/notes-data.json');
        
        // parse that string into the notes array and return
        return  JSON.parse(notesData);
    }
    catch (error) 
    {

        // in case of missing/corrupt file
        console.log("Creating storage");
    }
}


let saveNote = (notes) => 
{
    // write to file after converting to a string
    // use Sync version so that work is synchronized
    fs.writeFileSync('./storage/notes-data.json', JSON.stringify(notes));       
}

/*
-----------------Functions to be exported ------------------
*/

let addNote = (title, body) => 
{
    //fetch notes if already exixts
    let notes = fetchNotes();

    if (notes == undefined) {
        notes = [];
    }

    // creating the note object using es6 syntax
    let note = {
        title, // similar to title:title bcoz both names are same
        body
    };

    // check whether title already exixsts
    // filter will return an array containig true for duplicate 
    // titles, if length of array is 0, no duplicates exixts
    let duplicateTitle = notes.filter((note) => note.title === title)

    if (duplicateTitle.length == 0) 
    {
        // if the title do not exixsts in the storage, push the data in
        // push the new note into the notes array 
        notes.push(note);

        // save the notes array into storage
        saveNote(notes);

        //return the note 
        return note;
    } 
}


let getAll = () => 
{
    // return all the notes
    return fetchNotes();
}


let getNote = (title) => {
    // fetch the notes
    let notes = fetchNotes();

    // check if the notes available or not
    if (notes) {
        let requiredNote = notes.filter((note) => note.title == title);
        return requiredNote[0];
    }
    else {
        return {
            empty: true
        };
    }
}

let removeNote = (title) => {
    // fetch the notes from storage
    let notes = fetchNotes();

    //fileter the notes using filer
    let newNotes = notes.filter((note) => note.title !== title);

    //save new notes in storage
    saveNote(newNotes);

    return !(notes.length === newNotes.length);
}

let printNote = (note) => {
    let noteContents = 
    `------\n${note.title}\n${note.body}\n`
    console.log(noteContents)
}

/*
-------------------Exporting functions -----------------
*/

module.exports = {
    addNote,
    getNote,
    getAll,
    removeNote,
    printNote
}