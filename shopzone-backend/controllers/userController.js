const Usuario = require ('../models/userModel')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

/* Simular base de datos temporal
const usuarios = [
    { id: 1, nombre: 'Carlos', correo: 'carlos@example.com' },
    { id: 2, nombre: 'Maria', correo: 'maria@example.com' },
    { id: 3, nombre: 'Luis', correo: 'luis@example.com' }
];*/

// GET /api/usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, '-contrasena');
    res.json(usuarios);
  } catch {
    res.status(500).json({ mensaje : 'Error al obtener usuarios' });
    }
};

// GET /api/usuario:id
const obtenerUsuarioId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-contrasena');

    if(!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el usuario' });
  }
};

// POST /api/usuarios
const registrarUsuario = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(500).json({ errores: errores.array() });
  }

  const { nombre, correo, contrasena } = req.body;
  
  if (!nombre || !correo || !contrasena) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  
  try {
    const existeUsuario = await Usuario.findOne({ correo });
    if (existeUsuario) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const contrasenaHasheada = await bcrypt.hash(contrasena, salt);

    const nuevoUsuario = new Usuario ({
      nombre,
      correo,
      contrasena: contrasenaHasheada,
    });

    const usuarioGuardado = await nuevoUsuario.save();

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      usuario: {
        _id: usuarioGuardado._id,
        nombre: usuarioGuardado.nombre,
        correo: usuarioGuardado.correo,
        fechaRegistro: usuarioGuardado.fechaRegistro,
      },
    });
  } catch {
    console.error('❌ Error al registrar usuario:', error.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// PUT /api/usuario:id
const actualizarUsuario = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(500).json({ errores: errores.array() });
  }

  const { nombre, correo, contrasena } = req.body;

  try {
    const usuario = await Usuario.findById(req.params.id);

    if(!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar los campos basicos
    usuario.nombre = nombre || usuario.nombre;
    usuario.correo = correo || usuario.correo;

    // Si se envió una nueva contraseña, la ciframos antes de guardar
    if (contrasena) {
      const salt = await bcrypt.genSalt(10);
      usuario.contrasena = await bcrypt.hash(contrasena, salt);
    }

    const usuarioActualizado = await usuario.save();

    res.json({
      mensaje: 'Usuario actualizado correctamente',
      usuario: {
        _id: usuarioActualizado._id,
        nombre: usuarioActualizado.nombre,
        correo: usuarioActualizado.correo,
        fechaRegistro: usuarioActualizado.fechaRegistro
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// DELETE /api/usuario:id
const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encotrado' });
    }

    // Eliminar el cliente
    await usuario.deleteOne();
    res.json({ mensaje: 'Usuario eliminado correctamente' });

  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

// POST /api/usuarios/login
const loginUsuario = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    if (!correo || !contrasena) {
      return res.status(400).json({ error: 'Correo y contrasena son obligatorios' });
    }

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Comparar contraseña
    const passwordValido = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!passwordValido) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Enviar respuesta sin constraseña
    res.json({
      mensaje: 'Inicion de sesión exitoso',
      usuario: {
        _id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        fechaRegistro: usuario.fechaRegistro
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioId,
    registrarUsuario,
    actualizarUsuario,
    eliminarUsuario,
    loginUsuario
};
