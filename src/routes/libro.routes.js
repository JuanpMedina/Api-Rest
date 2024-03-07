const express = require('express');
const router = express.Router();
const Libro = require('../models/libro.models');

// Ruta para obtener todos los libros
router.get('/libro', async (req, res) => {
    const titulo = req.query.titulo || '';
    const libros = await Libro.find({ titulo: new RegExp(titulo, 'i') });
    res.status(200).json(libros);
});

// Ruta para crear un nuevo libro
router.post('/libro', async (req, res) => {
    try {
        const { titulo, autor, paginas, editorial } = req.body;
        if (!titulo || !autor || !paginas || !editorial) {
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        const nuevoLibro = new Libro({ titulo, autor, paginas, editorial });
        const libroCreado = await nuevoLibro.save();
        res.status(201).json(libroCreado);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el libro' });
    }
});

// Ruta para obtener un libro por ID
router.get('/libro/:id', async (req, res) => {
    const libro = await Libro.findById(req.params.id);
    if (!libro) {
        return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.status(200).json(libro);
});

// Ruta para actualizar un libro
router.put('/libro/:id', async (req, res) => {
    try {
        const updatedLibro = await Libro.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!updatedLibro) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }

        res.status(200).json(updatedLibro);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el libro' });
    }
});

// Ruta para eliminar un libro
router.delete('/libro/:id', async (req, res) => {
    try {
        const deletedLibro = await Libro.findByIdAndDelete(req.params.id);

        if (!deletedLibro) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }

        res.status(200).json(deletedLibro);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el libro' });
    }
});

module.exports = router;