const mongoose = require('mongoose')
const url = 
mongoose
    .connect('mongodb+srv://Vippili:Boplord12345@plextechfinalbackend.l1i7i.mongodb.net/PlextechFinalBackend?retryWrites=true&w=majority', { useUnifiedTopology: true , useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db

