// routes/userRoutes.js
const express = require('express');
const router = express.Router();

const { 
    obtenerUsuarios,
    obtenerUsuarioId,
    registrarUsuario, 
    actualizarUsuario,
    eliminarUsuario
} = require('../controllers/userController');

// Rutas
router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuarioId);
router.post('/', registrarUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;