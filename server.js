const express = require('express');
const app = express();
const port = 3001



const aboutus = [ 
    {'names': 'Vaibhav ', 'description': "Hi My name is Vaibhav!"},
    {'names': 'Anoushka ', 'description': "Hi My name is Anoushka!"},
    {'names': 'Joshua ', 'description': "Hi My name is Joshua!"}]

 

app.get('/about', (req, res) => {
    req.headers['Content-Type'] = 'application/json'
    req.headers['Accept'] = 'application.json'
    res.send(aboutus); 
});

app.listen(port, () => console.log(`Listening on Port ${port}`));