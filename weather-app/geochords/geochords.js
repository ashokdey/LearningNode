'use strict'

const request = require('request');

let getAddress = (address, callback) => 
{
    //encode the adddress - removing spaces
    const encodedAddress = encodeURIComponent(address);

    request({
        url : `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json : true
        }, (error, response, body) => {
        if (error) 
        {
            callback('Bad day! Failed to connect.')
        }
        else if (body.status === `ZERO_RESULTS`) 
        {
            callback(`Invalid address. Are you drunk?`);
        }
        else if (body.status === `OK`)
        {   
            callback(undefined, {
                address : body.results[0].formatted_address,
                latitude : body.results[0].geometry.location.lat,
                longitude : body.results[0].geometry.location.lng
            });
        }
    });
}

module.exports = {
    getAddress
};