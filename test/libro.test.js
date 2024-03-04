const request = require('supertest');
const express = require('express');

// Mockea el modelo de mongoose antes de importar las rutas
const mockLibroModel = {
    create: jest.fn(),
    find: jest.fn(),
    // Agrega más funciones de mongoose que quieras simular
};

jest.mock('../src/models/libro.models', () => mockLibroModel);

const libroRoutes = require('../src/routes/libro.routes'); // Importa después de la configuración de los mocks

const app = express();

app.use(express.json());
app.use('/apilibro', libroRoutes);
const findResponse = require('./dataLibro')
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
});
