const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.listen(3000, function() {
    console.log(`Example app listening on port 3000`)
  });

app.get('/', function(req,res){
    
    res.sendFile(__dirname+'/index.html');

});

app.post('/',function(req,res){
    const cityName = req.body.cityName;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=cbda3d6079140b73d53f6b09c2baa19e`;
    https.get(url,function(response){
        response.on('data', function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = 'https://openweathermap.org/img/wn/'+icon+'@2x.png';
            res.write('<p> Your weather is currently  '+ description+ '<p/>');
            res.write('<h1>The temperature is about '+ temp +' Celcius '+ '<h1/>' );
            res.write(`<img src='${imageUrl}'>`);
            
            res.send();
        });
    })
});

