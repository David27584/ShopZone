// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const { 
    obtenerUsuarios,
    obtenerUsuarioId,
    registrarUsuario, 
    actualizarUsuario,
    eliminarUsuario,
    loginUsuario
} = require('../controllers/userController');

// Validaciones para registro y actualización
const validacionesUsuario = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('correo').isEmail().withMessage('Correo Invalido'),
    body('contrasena').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

// Rutas
router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuarioId);
router.post('/', validacionesUsuario, registrarUsuario);
router.put('/:id', validacionesUsuario, actualizarUsuario);
router.delete('/:id', eliminarUsuario);
router.post('/login', loginUsuario);

module.exports = router;