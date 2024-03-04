const express = require("express");
const facturaSchema = require("../models/factura.models");


const routerFactura = express.Router();

//Creamos factura
routerFactura.post('/factura', (req, res) => {
    const factura = facturaSchema(req.body);
    factura
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Traemos todos los factura
routerFactura.get('/factura', (req, res) => {
    facturaSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Traemos un factura por su id
routerFactura.get('/factura/:id', (req, res) => {
    const { id } = req.params;
    facturaSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Actualizar un factura por su id
routerFactura.put('/factura/:id', (req, res) => {
    const { id } = req.params;
    const { libro, fechaReserva, usuario, precio } = req.body;
    facturaSchema
        .updateOne({ _id: id }, { $set: { libro, fechaReserva, usuario, precio } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Eliminar un factura por su id
routerFactura.delete('/factura/:id', (req, res) => {
    const { id } = req.params;
    facturaSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = routerFactura;