/* Empty JS object to act as endpoint for all routes */
// JavaScript Object named projectData initiated in the file
projectData = {};

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*cors*/
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('website'));
const port = 8000;

/* Spin up the server*/
const server = app.listen(port, listening);

function listening() {
    console.log(`running on localhost: ${port}`);
};

// TODO-ROUTES!

// get information
app.get('/getRealData', getRealData);

function getRealData(req, res) {
    res.send(projectData);
    console.log('data recieved from server is  ' + projectData);
}

// post information
app.post('/addWeather', function addWeather(req, res) {
    projectData = {
        temp: req.body.temp, // temperature
        dt: req.body.dt, // date
        feel: req.body.feel // feeling
    }
    res.send(projectData)
    console.log('the weather data final result is :' + projectData)
});

// get all data
app.get('/all', getData);

function getData(req, res) {
    res.send(projectData);
    console.log(projectData);
}