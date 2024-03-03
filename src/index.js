const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/libro");

const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use('/api' , userRoutes);

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