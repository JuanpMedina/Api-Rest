const mongoose = require("mongoose");

const facturaSchema = mongoose.Schema({
    libro: {
        type: String,
        required: true
    },
    fechaReserva: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Factura', facturaSchema);