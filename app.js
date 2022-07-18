const express = require('express');

const app = express();
const path = require('path');
const Museum = require('./models/museum');

// Connect mongoose and check for error
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/discover-museum',{
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console,"Connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

// Using template engines with Express
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'))

app.get('/', (req, res) => {
    res.render('home')
})

// Museum route: GET /museums
app.get('/museums', async (req, res) => {
    const museums = await Museum.find({});
    res.render('museums/index', {museums});
})

// Museum route: GET /museums/:id
app.get('/museums/:id', async (req, res) => {
    const museum = await Museum.findById(req.params.id)
    res.render('museums/show', {museum});
})

// Listen to port 3000
app.listen(3000, () => {
    console.log("Serving on port 3000")
})