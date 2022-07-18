const mongoose = require('mongoose');
const Museum = require('../models/museum');
const cities = require('./cities');
const {name} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/discover-museum', {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Museum.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const museums = new Museum({
            location: `${cities[random1000].city}`,
            title: `${sample(name)}`
        })
        await museums.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})