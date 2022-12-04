const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/', (req, res) => {
    // console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = "05d81c1712d2c79fcfd2264ee9ce7972";
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`
    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on('data', (data) => {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDes = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" +icon+"@2x.png"

            res.write(`<h1>The weather is currently ${weatherDes}, <h1>and the temperature in ${query} is ${temp} degrees celcius.</h1>`)
            res.write(`<img src=${imageURL} >`)
            res.send()
        })
    })
})



app.listen(3000, () => {
    console.log('Server is running on port 3000')
})