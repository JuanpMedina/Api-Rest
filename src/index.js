const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Rutas Cruds
const userRoutes = require("./routes/libro.routes");
const facturaRoutes = require("./routes/factura.routes")

const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(express.json());
app.use('/apilibro' , userRoutes);
app.use('/apifactura', facturaRoutes);

// routes
app.get('/', (req, res) => {
    res.send("Welcome to my API");
});

// Mongodb conexion
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conectado a MongoDB Atlas"))
    .catch((error) => console.error(error));

app.listen(port, () => console.log('Servidor escuchando el puerto',port));