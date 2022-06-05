const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendfile(__dirname + '/index.html');
});

app.post('/', (req, res) => {

const query = "London";
const apiKey = "c190c5b9bac354e1d88c10612a678d9f"
const unit = "metric";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;


    https.get(url, (response) => {

        console.log(response.statusCode);

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = `http://openweathermap.org/img/wn/' + icon + '.png'`;
            res.write("<p>The current temperature in " + query + " is " + temp + " degrees</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();

      
        });
    });

    console.log(req.body.name);
});






