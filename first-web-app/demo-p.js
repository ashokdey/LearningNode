'use strict';

const http = require('http');
const express = require('express');
const fs = require('fs');

//open config file asynchronously 
const configJSON = fs.readFile('./config.json', 'utf-8', (err, file)=>{
    const data = JSON.parse(file);
    const app = express();

    // folder in which out static web page are stored
    app.use(express.static(data.webServer.folder));

    const httpServer = http.createServer(app);

    httpServer.listen(data.webServer.port, (err)=>{
        if (err){
            console.log(err.message);
            return;
        }

        console.log(`Server running at port : ${data.webServer.port}`);
    });
});

console.log("opening config file");
