const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

// Mockea el modelo de mongoose antes de importar las rutas
const mockLibroModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndRemove: jest.fn(),
};

jest.mock('../src/models/libro.models', () => mockLibroModel);

const libroRoutes = require('../src/routes/libro.routes');

const app = express();
app.use(express.json());
app.use('/apilibro', libroRoutes);

const findResponse = require('./dataLibro');

describe('Libro Routes', () => {
    it('should get all libros', async () => {
        mockLibroModel.find.mockResolvedValue(findResponse);

        const response = await request(app).get('/apilibro/libro');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(findResponse);
    });

    const createResponse = {
        _id: '123456789',
        titulo: 'Test Libro',
        autor: 'Test Autor',
        paginas: 200,
        editorial: 'Test Editorial',
    };

    it('Should fail to create a Libro', async () => {
        mockLibroModel.create.mockResolvedValue(createResponse);

        const response = await request(app)
            .post('/apilibro/libro')
            .send({ titulo: 'Test Libro', autor: 'Test Autor', paginas: 200, editorial: 'Test Editorial' });

        expect(response.statusCode).toBe(500);
    });

    // Prueba para obtener un libro por ID
    it('should get a libro by ID', async () => {
        const mockLibroResponse = findResponse[0]; // Supongamos que findResponse es un array de libros
        mockLibroModel.findById.mockResolvedValue(mockLibroResponse);

        const response = await request(app).get('/apilibro/libro/123456789');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockLibroResponse);
    });

    // Prueba para actualizar un libro
    it('should update a libro', async () => {
        const updatedLibro = {
            _id: '123456789',
            titulo: 'Libro Actualizado',
            autor: 'Test Autor',
            paginas: 300,
            editorial: 'Test Editorial',
        };
        mockLibroModel.findByIdAndUpdate.mockResolvedValue(updatedLibro);

        const response = await request(app)
            .put('/apilibro/libro/123456789')
            .send(updatedLibro);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(updatedLibro);
    });

    // Prueba para manejar un ID de libro no válido
    it('should return an error for an invalid libro ID', async () => {
        mockLibroModel.findById.mockResolvedValue(null);

        const response = await request(app).get();
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
    });

    // Prueba para validar campos requeridos al crear un libro
    it('should fail to create a libro when required fields are missing', async () => {
        const response = await request(app)
            .post()
            .send({ autor: 'Test Autor' });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    // Prueba para buscar libros por título
    it('should get libros by title', async () => {
        const mockLibrosResponse = findResponse.filter(
            (libro) => libro.titulo.includes('Test')
        );
        mockLibroModel.find.mockResolvedValue(mockLibrosResponse);

        const response = await request(app).get();

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockLibrosResponse);
    });

    // Prueba para manejar un ID de libro no válido al actualizar
    it('should return an error for an invalid libro ID when updating', async () => {
        mockLibroModel.findByIdAndUpdate.mockResolvedValue(null);

        const updatedLibro = {
            titulo: 'Libro Actualizado',
            autor: 'Test Autor',
            paginas: 300,
            editorial: 'Test Editorial',
        };

        const response = await request(app)
            .put('/apilibro/libro/invalidId')
            .send(updatedLibro);

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
    });
});