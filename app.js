const express = require('express');
const https = require('https');

const app = express();




app.get('/', (req, res) => {

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
            res.send("The temperature in London is " + temp + " and the weather is " + weatherDescription);
        });
    });
});


