const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MuseumSchema = new Schema({
    title: String,
    description: String,
    location: String
});

module.exports = mongoose.model('Museum',MuseumSchema);