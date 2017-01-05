'use strict';

const http = require('http');
const express = require('express');
const fs = require('fs');

// loading folder and port number from config file
const configJSON = fs.readFileSync('./config.json');
const config = JSON.parse(configJSON);

const app = express();
app.use(express.static(config.webServer.folder));

const httpServer = http.createServer(app);

httpServer.listen(config.webServer.port, (err)=>{
    if (err) {
        console.log(err.message);
        return;
    }

    console.log(`server running at port:${config.webServer.port}`);
});