const express = require("express");
const libroSchema = require("../models/libro.models");


const routerLibro = express.Router();

//Creamos libro
routerLibro.post('/libro', (req, res) => {
    const libro = libroSchema(req.body);
    libro
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Traemos todos los libros
routerLibro.get('/libro', (req, res) => {
    libroSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Traemos un libro por su id
routerLibro.get('/libro/:id', (req, res) => {
    const { id } = req.params;
    libroSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Actualizar un libro por su id
routerLibro.put('/libro/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, autor, paginas, editorial } = req.body;
    libroSchema
        .updateOne({ _id: id }, { $set: { titulo, autor, paginas, editorial } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Eliminar un libro por su id
routerLibro.delete('/libro/:id', (req, res) => {
    const { id } = req.params;
    libroSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = routerLibro;