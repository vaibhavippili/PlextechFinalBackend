const express = require('express');
const cors = require('cors')
const app = express();
const axios = require('axios')

app.use(express.json());
app.use(cors())
const port = 3001



const aboutus = [ 
    {'names': 'Vaibhav ', 'description': "Hi My name is Vaibhav!"},
    {'names': 'Anoushka ', 'description': "Hi My name is Anoushka!"}]



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

app.listen(port, () => console.log(`Listening on Port ${port}`));



