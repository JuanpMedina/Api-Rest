const mongoose = require("mongoose");

const libroSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    paginas: {
        type: Number,
        required: true
    },
    editorial: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Libro', libroSchema);