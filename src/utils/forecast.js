const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8bf3293947b0077fdc1f6764d8121c1a&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, response, body) => {

        if (error) {
            callback('Connect problems! ' + error)
        } else if (response.statusCode !== 200) {
            callback('Unable to find location\'! ' + error)
        } else {
            callback(undefined, body.current, body.location)
        }
    })
}

module.exports = forecast
