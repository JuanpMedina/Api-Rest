const express = require('express');

const router = express.Router();

// Crear usuario
router.post('/libro', (req, res) =>{
    res.send("Crear libro");
});

module.exports = router;