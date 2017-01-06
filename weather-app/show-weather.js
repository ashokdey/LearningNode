'use strict';
const request = require('request');
const yargs = require('yargs');
const geochords = require('./geochords/geochords');
const weather = require('./weather/weather');

const argv = yargs.options({
    address : {
        description : "get weather for address",
        demand : true,
        alias : 'a',
        string : true
    }
}).help().alias('help', 'h').argv;

// get the latitude and longitude
geochords.getAddress(argv.address, (errorMessage, result) => {
    if (errorMessage){
        console.log(errorMessage);
    }
    else {
        //print the address
        console.log(`----------\nWeather for : ${result.address}`);
        // get the weather details using latitude and longitude
        weather.getWeather(result.latitude, result.longitude, (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(`Temperature : ${result.temp} \u00B0C\nFeels Like : ${result.feelTemp} \u00B0C\nHumidity : ${result.humidity}%\nWind Speed : ${result.ws}km/h\nPowered by : https://darksky.net/poweredby`);
            }
        });
    }
});