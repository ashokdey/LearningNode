'use sctict';
const request = require('request');

let getWeather = (lat, lng, callback) => 
{
    request({
            url :`https://api.darksky.net/forecast/6cad342a1caf0f17020d8228ed704249/${lat},${lng}?units=si&exclude=minutely,hourly,daily,flags`,
            json : true
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                 callback(undefined, {
                     temp : body.currently.temperature,
                     feelTemp: body.currently.apparentTemperature,
                     humidity : body.currently.humidity * 100,
                     ws : body.currently.windSpeed
                 });
            }
            else 
            {
                callback('Sorry, failed to fetch weather details');
            }
        });
}

module.exports = {
    getWeather
};