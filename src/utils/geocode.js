const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoicm9oYWpkYSIsImEiOiJja2psczVrbm8yNjdrMnlsb2JyMjBmNGhoIn0.WpKLg4qMtxg2wzRsQuS2jA&limit=1'

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.')
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const placeName = body.features[0].place_name
            callback(undefined, latitude, longitude, placeName)
        }
    })
}

module.exports = geocode
