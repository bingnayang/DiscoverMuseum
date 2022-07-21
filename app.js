const express = require('express');

const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const Museum = require('./models/museum');
const methodOverride = require('method-override');

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

// Use ejs-locals for all ejs templates:
app.engine('ejs', ejsMate)
// Using template engines with Express
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'))

// Middleware: body-parser
app.use(express.urlencoded({extended: true}))
// Override using a query value
app.use(methodOverride('_method'))


app.get('/', (req, res) => {
    res.render('home')
})

// Museum route: GET /museums
app.get('/museums', async (req, res) => {
    const museums = await Museum.find({});
    res.render('museums/index', {museums});
})

// Museum route: GET /museums/new
app.get('/museums/new', (req, res) => {
    res.render('museums/new');
})

// Museum route: GET /museums/:id
app.get('/museums/:id', async (req, res) => {
    const museum = await Museum.findById(req.params.id)
    res.render('museums/show', {museum});
})

// Museum route: POST /museums
app.post('/museums', async (req, res) => {
    const museum = new Museum(req.body.museum);
    await museum.save();
    res.redirect(`/museums/${museum._id}`)
})

// Museum route: GET /museums/:id/edit
app.get('/museums/:id/edit', async (req, res) => {
    const museum = await Museum.findById(req.params.id)
    res.render('museums/edit', {museum});
})

// Museum route( update museum ): PUT /museums/:id
app.put('/museums/:id', async (req, res) => {
    const { id } = req.params;
    const museum = await Museum.findByIdAndUpdate(id, {...req.body.museum });
    res.redirect(`/museums/${museum._id}`)
})

// Museum route( delete museum ): DELETE /museums/:id
app.delete('/museums/:id', async (req, res) => {
    const { id } = req.params;
    await Museum.findByIdAndDelete(id);
    res.redirect(`/museums`)
})

// Listen to port 3000
app.listen(3000, () => {
    console.log("Serving on port 3000")
})