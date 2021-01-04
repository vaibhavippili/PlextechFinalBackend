const express = require('express');
const cors = require('cors')
const app = express();
const axios = require('axios')
const bodyParser = require('body-parser')
const db = require('./db')
const todoRouter = require('./routes/todo-router')
app.use(express.json());
app.use(cors())
const port = 3001



app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.use('/', todoRouter)













const aboutus = [ 
    {'names': 'Vaibhav ', 'description': "Hi My name is Vaibhav!"},
    {'names': 'Anoushka ', 'description': "Hi My name is Anoushka!"}]

const contactus = [ 
    {'contacts': 'Vaibhav ', 'email': "vaibhavippili@berkeley.edu"},
    {'contacts': 'Anoushka ', 'email': "asingal@berkeley.edu"}]
        
        
        
app.get('/contact', (req, res) => {
            res.send(contactus); 
        });

app.get('/about', (req, res) => {
    res.send(aboutus); 
});

app.get('/news', (req, res) => {
    axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=fc522e115d6c438c9488caa5d83a3264')
    .then((news, err) => {

        if (err) res.send(err)
        res.send(news.data)
    })
});

app.get('/weather', (req, res) => {
    axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=37.550201&lon=-121.980827&units=imperial&exclude=minutely,hourly,daily&appid=edcef1ec7ab786081b3fc802305d8c46')
    .then((weather, err) => {

        if (err) res.send(err)
        res.send(weather.data)
    })
});


app.listen(port, () => console.log(`Listening on Port ${port}`));



