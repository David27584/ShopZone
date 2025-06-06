// routes/userRoutes.js
const express = require('express');
const router = express.Router();

const { obtenerUsuarios, registrarUsuario } = require('../controllers/userController');

// Rutas
router.get('/', obtenerUsuarios);
router.post('/', registrarUsuario);

module.exports = router;