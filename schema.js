const mongoose = require ("mongoose")

const book = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number
    },
    availableCopies: {
        type: Number,
        required: true
    },
    borrowedBy: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('book', book);