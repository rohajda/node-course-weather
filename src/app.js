const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Degine paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Robert Ohajda'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Robert Ohajda'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Robert Ohajda',
        message: 'Something goes wrong , do you need help??'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }

    geocode(req.query.address, (error, latitude, longitude, placeName) => {
        if (error) {
            return res.send({
                error
            })
        } else {
            console.log(placeName)
            console.log(`lat: ${latitude} , lon: ${longitude}`)
            forecast(latitude, longitude, (error, {
                temperature,
                feelslike,
                weather_descriptions: desc
            } = {}, {name, country} = {}) => {
                if (error) {
                    return res.send({
                        error
                    })
                } else {
                    console.log('.. temperature: ' + temperature)
                    console.log('.. feels like: ' + feelslike)
                    console.log('.. description: ' + desc[0])

                    res.send({
                        forecast: desc[0],
                        temperature,
                        feelslike,
                        location: `${name}, ${country}`,
                        address: req.query.address
                    })
                }
            })
        }
    })

    /* res.send({
         forecast: 'It is snowing',
         location: 'Zvolen',
         address: req.query.address
     })*/

})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('help', {
        title: '404',
        name: 'Robert Ohajda',
        message: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
