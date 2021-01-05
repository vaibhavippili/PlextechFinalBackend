const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const mongoose = require('mongoose');
app.use(express.json());
app.use(cors());
const port = 4007;

const ObjectId = require("mongoose").Types.ObjectId;

mongoose.connect('mongodb+srv://Vippili:Boplord12345@plextechfinalbackend.l1i7i.mongodb.net/PlextechFinalBackend?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

const todosSchema = new mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  todos: [
    {
      checked: Boolean,
      text: String,
      id: String,
    },
  ],
});
const Todos = mongoose.model("Todos", todosSchema);


app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (user) {
    res.status(500);
    res.json({
      message: "user already exists",
    });
    return;
  }
  await User.create({ username, password });
  res.json({
    message: "success",
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "invalid login",
    });
    return;
  }
  res.json({
    message: "success",
  });
});

app.post("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const todosItems = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "invalid access",
    });
    return;
  }
  const todos = await Todos.findOne({ userId: user._id }).exec();
  if (!todos) {
    await Todos.create({
      userId: user._id,
      todos: todosItems,
    });
  } else {
    todos.todos = todosItems;
    await todos.save();
  }
  res.json(todosItems);
});

app.get("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "invalid access",
    });
    return;
  }
  const { todos } = await Todos.findOne({ userId: user._id }).exec();
  res.json(todos);
});








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

const puppeteer = require('puppeteer');
rawTxt = '';
 covidstats = [] ;

async function scrapeCovidStat(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="gatsby-focus-wrapper"]/div/div[4]/div[2]/h2/p');
    const txt = await el.getProperty('textContent');
    rawTxt = await txt.jsonValue();
    covidstats = [ 
        {'headlines': "Today's WHO Report: ", 'report': rawTxt}]
   ;
 
//browser.close();
}

 scrapeCovidStat('https://covid19.who.int/');

app.get('/covid', (req, res) => {
    res.send(covidstats); 
 });


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
   });
 });